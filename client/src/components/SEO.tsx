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
  description = 'Full-stack developer intern at Tonik, final-year B.Tech CSE student at SRM IST. Building AI-powered platforms with FastAPI, Next.js, LangGraph, and Kong API Gateway.',
  keywords = 'Dhanush Ranga, Full-Stack Developer, AI Engineer, FastAPI, React, Python, TypeScript, LangGraph, Kong, SRM IST',
  ogImage = 'https://dhanushranga1.dev/og-image.png',
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
    description: 'Full-stack developer intern at Tonik, final-year B.Tech CSE at SRM IST Kattankulathur. Building AI platforms, agentic systems, and API gateway tools.',
    keywords: 'Dhanush Ranga, Full-Stack Developer, AI Engineer, FastAPI, React, LangGraph, Kong, Python, TypeScript, SRM IST',
    canonicalUrl: 'https://dhanushranga1.dev/',
  },
  about: {
    title: 'About Me | Dhanush Ranga Gopisetty',
    description: 'Full-stack developer intern at Tonik. Final-year B.Tech CSE at SRM IST Kattankulathur (2022–2026), CGPA 9.06. AI governance, Kong API Gateway, LangGraph.',
    keywords: 'Dhanush Ranga, About, SRM IST, Computer Science, Software Engineer, Tonik, Kong, LangGraph',
    canonicalUrl: 'https://dhanushranga1.dev/about',
  },
  projects: {
    title: 'Projects | Dhanush Ranga Gopisetty',
    description: 'Portfolio: TicketPilot (multi-tenant RAG support platform), Kong-Agentic (natural-language Kong OSS interface), CineReads, Mesh3, ScrubPy.',
    keywords: 'Projects, Portfolio, TicketPilot, Kong-Agentic, CineReads, ScrubPy, FastAPI, React, AI, CASPER, LangGraph',
    canonicalUrl: 'https://dhanushranga1.dev/projects',
  },
  blog: {
    title: 'Blog | Dhanush Ranga Gopisetty',
    description: 'Technical blog covering AI integration, FastAPI development, cloud deployment, DevOps, and practical software engineering insights.',
    keywords: 'Tech Blog, AI, FastAPI, Docker, Cloud, DevOps, Python, Web Development',
    canonicalUrl: 'https://dhanushranga1.dev/blog',
  },
  photos: {
    title: 'Photos | Dhanush Ranga Gopisetty',
    description: 'Personal photography collection and visual projects by Dhanush Ranga Gopisetty.',
    keywords: 'Photography, Photos, Portfolio, Visual Work',
    canonicalUrl: 'https://dhanushranga1.dev/photos',
  },
  contact: {
    title: 'Contact Me | Dhanush Ranga Gopisetty',
    description: 'Get in touch with me for collaboration opportunities, project inquiries, or just to connect. Available for internships and freelance work.',
    keywords: 'Contact, Email, Collaboration, Hire, Internship, Freelance',
    canonicalUrl: 'https://dhanushranga1.dev/contact',
  },
  favorites: {
    title: 'Favorites | Dhanush Ranga Gopisetty',
    description: 'My curated list of favorite tools, technologies, books, and resources that shape my development workflow.',
    keywords: 'Favorites, Tools, Technologies, Resources, Developer Tools',
    canonicalUrl: 'https://dhanushranga1.dev/favorites',
  },
  gitTimeline: {
    title: 'Git Timeline | Dhanush Ranga Gopisetty',
    description: 'Visual timeline of my development activity, commits, and contributions across various projects.',
    keywords: 'Git Timeline, GitHub, Commits, Development Activity, Open Source',
    canonicalUrl: 'https://dhanushranga1.dev/git-timeline',
  },
};
