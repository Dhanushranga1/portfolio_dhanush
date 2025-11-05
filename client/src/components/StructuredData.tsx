import { useEffect } from 'react';

interface PersonStructuredDataProps {
  name?: string;
  jobTitle?: string;
  url?: string;
  sameAs?: string[];
}

export function PersonStructuredData({
  name = 'Dhanush Ranga Gopisetty',
  jobTitle = 'Full-Stack Developer & AI Engineer',
  url = 'https://dhanushranga.dev',
  sameAs = [
    'https://github.com/Dhanushranga1',
    'https://linkedin.com/in/dhanushranga',
  ],
}: PersonStructuredDataProps) {
  useEffect(() => {
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name,
      jobTitle,
      url,
      sameAs,
      alumniOf: {
        '@type': 'CollegeOrUniversity',
        name: 'George Mason University',
      },
      knowsAbout: [
        'FastAPI',
        'React',
        'TypeScript',
        'Python',
        'Machine Learning',
        'Web Development',
        'Artificial Intelligence',
      ],
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    script.id = 'person-structured-data';

    // Remove existing script if present
    const existing = document.getElementById('person-structured-data');
    if (existing) {
      existing.remove();
    }

    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.getElementById('person-structured-data');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [name, jobTitle, url, sameAs]);

  return null;
}

interface BlogPostStructuredDataProps {
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string | null;
  author: string;
  image?: string | null;
  url: string;
}

export function BlogPostStructuredData({
  title,
  description,
  publishedAt,
  updatedAt,
  author,
  image,
  url,
}: BlogPostStructuredDataProps) {
  useEffect(() => {
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: title,
      description,
      image: image || 'https://dhanushranga.dev/og-image.png',
      datePublished: publishedAt,
      dateModified: updatedAt || publishedAt,
      author: {
        '@type': 'Person',
        name: author,
        url: 'https://dhanushranga.dev',
      },
      publisher: {
        '@type': 'Person',
        name: author,
        url: 'https://dhanushranga.dev',
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': url,
      },
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    script.id = 'blog-post-structured-data';

    // Remove existing script if present
    const existing = document.getElementById('blog-post-structured-data');
    if (existing) {
      existing.remove();
    }

    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.getElementById('blog-post-structured-data');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [title, description, publishedAt, updatedAt, author, image, url]);

  return null;
}
