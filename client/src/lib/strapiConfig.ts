/**
 * Strapi CMS Configuration
 * 
 * This file contains configuration for connecting to your Strapi headless CMS.
 * Strapi will manage: Movies, Photos, Blog Posts
 * 
 * Setup Instructions:
 * 1. Install Strapi: npx create-strapi-app@latest cms --quickstart
 * 2. Create content types (see docs/STRAPI_SETUP.md)
 * 3. Update STRAPI_URL below
 * 4. Generate API token in Strapi admin panel
 * 5. Add token to .env: VITE_STRAPI_TOKEN=your_token_here
 */

export const STRAPI_CONFIG = {
  // Strapi API URL (update this when you deploy Strapi)
  API_URL: import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337',
  
  // API Token (set in .env file for security)
  API_TOKEN: import.meta.env.VITE_STRAPI_TOKEN || '',
  
  // API Endpoints
  ENDPOINTS: {
    MOVIES: '/api/movies',
    PHOTOS: '/api/photos',
    PHOTO_ALBUMS: '/api/photo-albums',
    BLOG_POSTS: '/api/blog-posts',
    BLOG_CATEGORIES: '/api/blog-categories',
  },
  
  // Image quality settings
  IMAGE_FORMATS: {
    thumbnail: 'thumbnail', // 245x156
    small: 'small',         // 500x500
    medium: 'medium',       // 750x750
    large: 'large',         // 1000x1000
  }
} as const;

/**
 * Helper function to build Strapi image URL
 */
export function getStrapiImageUrl(imageData: any, format: keyof typeof STRAPI_CONFIG.IMAGE_FORMATS = 'medium'): string {
  if (!imageData) return '';
  
  // Handle both direct URL and formatted images
  const url = imageData.formats?.[format]?.url || imageData.url;
  
  if (!url) return '';
  
  // If URL is relative, prepend Strapi base URL
  if (url.startsWith('/')) {
    return `${STRAPI_CONFIG.API_URL}${url}`;
  }
  
  return url;
}

/**
 * Helper function to create fetch headers with auth
 */
export function getStrapiHeaders(): HeadersInit {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  
  if (STRAPI_CONFIG.API_TOKEN) {
    headers['Authorization'] = `Bearer ${STRAPI_CONFIG.API_TOKEN}`;
  }
  
  return headers;
}

/**
 * Helper function to build query string with populate
 */
export function buildStrapiQuery(params: {
  populate?: string | string[];
  filters?: Record<string, any>;
  sort?: string | string[];
  pagination?: { page?: number; pageSize?: number };
}): string {
  const queryParams = new URLSearchParams();
  
  // Populate relations
  if (params.populate) {
    if (Array.isArray(params.populate)) {
      params.populate.forEach(field => queryParams.append('populate', field));
    } else {
      queryParams.append('populate', params.populate);
    }
  }
  
  // Filters
  if (params.filters) {
    Object.entries(params.filters).forEach(([key, value]) => {
      queryParams.append(`filters[${key}][$eq]`, String(value));
    });
  }
  
  // Sorting
  if (params.sort) {
    if (Array.isArray(params.sort)) {
      params.sort.forEach(field => queryParams.append('sort', field));
    } else {
      queryParams.append('sort', params.sort);
    }
  }
  
  // Pagination
  if (params.pagination) {
    if (params.pagination.page) {
      queryParams.append('pagination[page]', String(params.pagination.page));
    }
    if (params.pagination.pageSize) {
      queryParams.append('pagination[pageSize]', String(params.pagination.pageSize));
    }
  }
  
  const queryString = queryParams.toString();
  return queryString ? `?${queryString}` : '';
}
