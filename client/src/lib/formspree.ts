/**
 * Formspree Integration Utilities
 * 
 * Handles form submission to Formspree with validation, spam protection,
 * and error handling.
 */

// Formspree endpoint from environment variable
const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT;

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  _subject?: string;
  _replyto?: string;
  _gotcha?: string; // honeypot field
}

export interface MessageFormData {
  message: string;
  _subject?: string;
  _gotcha?: string; // honeypot field
}

export interface FormspreeResponse {
  ok: boolean;
  next?: string;
  error?: string;
}

/**
 * Validates email format
 */
export function isValidEmail(email: string): boolean {
  if (!email || email.trim() === '') return true; // email is optional
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates message content
 */
export function isValidMessage(message: string): boolean {
  return Boolean(message && message.trim().length >= 5);
}

/**
 * Checks if honeypot field has been filled (spam detection)
 */
export function isSpam(honeypot: string | undefined): boolean {
  return honeypot !== undefined && honeypot.trim() !== '';
}

/**
 * Submit contact form to Formspree
 */
export async function submitContactForm(
  data: ContactFormData
): Promise<FormspreeResponse> {
  if (!FORMSPREE_ENDPOINT) {
    console.error('FORMSPREE_ENDPOINT is not set:', FORMSPREE_ENDPOINT);
    throw new Error('Formspree endpoint not configured. Please set VITE_FORMSPREE_ENDPOINT in .env');
  }

  // Validate data
  if (!isValidMessage(data.message)) {
    return {
      ok: false,
      error: 'Please write a longer message (at least 5 characters).',
    };
  }

  if (!isValidEmail(data.email)) {
    return {
      ok: false,
      error: 'Please use a valid email or leave it blank.',
    };
  }

  // Check honeypot
  if (isSpam(data._gotcha)) {
    return {
      ok: false,
      error: 'Spam detected.',
    };
  }

  // Prepare form data
  const formData = new FormData();
  formData.append('name', data.name);
  formData.append('email', data.email);
  formData.append('message', data.message);
  
  // Set reply-to if email provided
  if (data.email) {
    formData.append('_replyto', data.email);
  }
  
  // Add subject
  formData.append('_subject', data._subject || 'New contact form submission');
  
  // Add honeypot
  if (data._gotcha !== undefined) {
    formData.append('_gotcha', data._gotcha);
  }

  try {
    const response = await fetch(
      `https://formspree.io/f/${FORMSPREE_ENDPOINT}`,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
        },
        body: formData,
      }
    );

    const json = await response.json();

    if (response.ok) {
      return {
        ok: true,
        next: json.next,
      };
    } else {
      return {
        ok: false,
        error: json.error || json.errors?.[0]?.message || 'Send failed. Please try again later.',
      };
    }
  } catch (error) {
    return {
      ok: false,
      error: 'Network error. Please check your connection and try again.',
    };
  }
}

/**
 * Submit anonymous message to Formspree
 */
export async function submitMessage(
  data: MessageFormData
): Promise<FormspreeResponse> {
  if (!FORMSPREE_ENDPOINT) {
    throw new Error('Formspree endpoint not configured. Please set VITE_FORMSPREE_ENDPOINT in .env');
  }

  // Validate data
  if (!isValidMessage(data.message)) {
    return {
      ok: false,
      error: 'Please write a longer message (at least 5 characters).',
    };
  }

  // Check honeypot
  if (isSpam(data._gotcha)) {
    return {
      ok: false,
      error: 'Spam detected.',
    };
  }

  // Prepare form data
  const formData = new FormData();
  formData.append('message', data.message);
  formData.append('_subject', data._subject || 'New anonymous message');
  
  // Add honeypot
  if (data._gotcha !== undefined) {
    formData.append('_gotcha', data._gotcha);
  }

  try {
    const response = await fetch(
      `https://formspree.io/f/${FORMSPREE_ENDPOINT}`,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
        },
        body: formData,
      }
    );

    const json = await response.json();

    if (response.ok) {
      return {
        ok: true,
        next: json.next,
      };
    } else {
      return {
        ok: false,
        error: json.error || 'Send failed. Please try again later.',
      };
    }
  } catch (error) {
    console.error('Formspree submission error:', error);
    return {
      ok: false,
      error: 'Network error. Please check your connection and try again.',
    };
  }
}

/**
 * Format relative time (e.g., "2 hours ago")
 */
export function formatRelativeTime(date: Date | string): string {
  const then = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - then.getTime();
  
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return 'just now';
  if (minutes === 1) return '1 minute ago';
  if (minutes < 60) return `${minutes} minutes ago`;
  
  const hours = Math.floor(minutes / 60);
  if (hours === 1) return 'about 1 hour ago';
  if (hours < 24) return `about ${hours} hours ago`;
  
  const days = Math.floor(hours / 24);
  if (days === 1) return '1 day ago';
  if (days < 30) return `${days} days ago`;
  
  const months = Math.floor(days / 30);
  if (months === 1) return '1 month ago';
  if (months < 12) return `${months} months ago`;
  
  const years = Math.floor(months / 12);
  if (years === 1) return '1 year ago';
  return `${years} years ago`;
}
