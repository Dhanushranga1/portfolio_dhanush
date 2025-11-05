import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  canonicalUrl?: string;
}

export function SEO({
  title = 'Dhanush Ranga Gopisetty | Full-Stack Developer & AI Engineer',
  description = 'Computer Science student at George Mason University building AI-powered applications with FastAPI, React, and modern web technologies.',
  keywords = 'Dhanush Ranga, Full-Stack Developer, AI Engineer, FastAPI, React, Python, TypeScript',
  ogImage = 'https://dhanushranga.dev/og-image.png',
  ogType = 'website',
  canonicalUrl,
}: SEOProps) {
  useEffect(() => {
    // Update title
    document.title = title;

    // Update or create meta tags
    const updateMeta = (name: string, content: string, property = false) => {
      const attribute = property ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };

    // Primary meta tags
    updateMeta('description', description);
    updateMeta('keywords', keywords);

    // Open Graph
    updateMeta('og:title', title, true);
    updateMeta('og:description', description, true);
    updateMeta('og:image', ogImage, true);
    updateMeta('og:type', ogType, true);
    
    if (canonicalUrl) {
      updateMeta('og:url', canonicalUrl, true);
    }

    // Twitter Card
    updateMeta('twitter:title', title, true);
    updateMeta('twitter:description', description, true);
    updateMeta('twitter:image', ogImage, true);

    // Canonical URL
    if (canonicalUrl) {
      let linkElement = document.querySelector('link[rel="canonical"]');
      if (!linkElement) {
        linkElement = document.createElement('link');
        linkElement.setAttribute('rel', 'canonical');
        document.head.appendChild(linkElement);
      }
      linkElement.setAttribute('href', canonicalUrl);
    }
  }, [title, description, keywords, ogImage, ogType, canonicalUrl]);

  return null;
}

// Predefined SEO configs for different pages
export const seoConfigs = {
  home: {
    title: 'Dhanush Ranga Gopisetty | Full-Stack Developer & AI Engineer',
    description: 'Computer Science student at George Mason University building AI-powered applications with FastAPI, React, and modern web technologies. Explore my projects and technical blog.',
    keywords: 'Dhanush Ranga, Full-Stack Developer, AI Engineer, FastAPI, React, Python, TypeScript, Web Development, Machine Learning',
    canonicalUrl: 'https://dhanushranga.dev/',
  },
  about: {
    title: 'About Me | Dhanush Ranga Gopisetty',
    description: 'Learn about my journey as a Computer Science student at George Mason University, my technical skills, and my passion for building AI-powered web applications.',
    keywords: 'Dhanush Ranga, About, George Mason University, Computer Science, Software Engineer',
    canonicalUrl: 'https://dhanushranga.dev/about',
  },
  projects: {
    title: 'Projects | Dhanush Ranga Gopisetty',
    description: 'Explore my portfolio of projects including TicketPilot, CineReads, ScrubPy, and more. Full-stack applications built with FastAPI, React, AI, and modern web technologies.',
    keywords: 'Projects, Portfolio, TicketPilot, CineReads, ScrubPy, FastAPI, React, AI Projects',
    canonicalUrl: 'https://dhanushranga.dev/projects',
  },
  blog: {
    title: 'Blog | Dhanush Ranga Gopisetty',
    description: 'Technical blog covering AI integration, FastAPI development, cloud deployment, DevOps, and practical software engineering insights.',
    keywords: 'Tech Blog, AI, FastAPI, Docker, Cloud, DevOps, Python, Web Development',
    canonicalUrl: 'https://dhanushranga.dev/blog',
  },
  photos: {
    title: 'Photos | Dhanush Ranga Gopisetty',
    description: 'Personal photography collection and visual projects by Dhanush Ranga Gopisetty.',
    keywords: 'Photography, Photos, Portfolio, Visual Work',
    canonicalUrl: 'https://dhanushranga.dev/photos',
  },
  contact: {
    title: 'Contact Me | Dhanush Ranga Gopisetty',
    description: 'Get in touch with me for collaboration opportunities, project inquiries, or just to connect. Available for internships and freelance work.',
    keywords: 'Contact, Email, Collaboration, Hire, Internship, Freelance',
    canonicalUrl: 'https://dhanushranga.dev/contact',
  },
  favorites: {
    title: 'Favorites | Dhanush Ranga Gopisetty',
    description: 'My curated list of favorite tools, technologies, books, and resources that shape my development workflow.',
    keywords: 'Favorites, Tools, Technologies, Resources, Developer Tools',
    canonicalUrl: 'https://dhanushranga.dev/favorites',
  },
  gitTimeline: {
    title: 'Git Timeline | Dhanush Ranga Gopisetty',
    description: 'Visual timeline of my development activity, commits, and contributions across various projects.',
    keywords: 'Git Timeline, GitHub, Commits, Development Activity, Open Source',
    canonicalUrl: 'https://dhanushranga.dev/git-timeline',
  },
};
