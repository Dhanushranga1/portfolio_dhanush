/**
 * React hooks for Strapi CMS integration
 * 
 * These hooks use React Query for caching and state management
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { STRAPI_CONFIG, getStrapiHeaders, buildStrapiQuery } from '@/lib/strapiConfig';
import type {
  MoviesResponse,
  PhotosResponse,
  PhotoAlbumsResponse,
  BlogPostsResponse,
  BlogCategoriesResponse,
  MovieEntity,
  PhotoEntity,
  BlogPostEntity,
} from '@shared/strapi-types';

// ============================================================================
// Movies
// ============================================================================

export function useMovies(options?: {
  favorite?: boolean;
  watched?: boolean;
  sort?: string;
}) {
  return useQuery({
    queryKey: ['movies', options],
    queryFn: async () => {
      const filters: Record<string, any> = {};
      if (options?.favorite !== undefined) filters.favorite = options.favorite;
      if (options?.watched !== undefined) filters.watched = options.watched;
      
      const query = buildStrapiQuery({
        populate: ['poster'],
        filters,
        sort: options?.sort || 'rating:desc',
      });
      
      const response = await fetch(
        `${STRAPI_CONFIG.API_URL}${STRAPI_CONFIG.ENDPOINTS.MOVIES}${query}`,
        { headers: getStrapiHeaders() }
      );
      
      if (!response.ok) {
        throw new Error(`Failed to fetch movies: ${response.statusText}`);
      }
      
      return response.json() as Promise<MoviesResponse>;
    },
    enabled: !!STRAPI_CONFIG.API_URL,
  });
}

export function useMovie(id: number) {
  return useQuery({
    queryKey: ['movie', id],
    queryFn: async () => {
      const query = buildStrapiQuery({
        populate: ['poster'],
      });
      
      const response = await fetch(
        `${STRAPI_CONFIG.API_URL}${STRAPI_CONFIG.ENDPOINTS.MOVIES}/${id}${query}`,
        { headers: getStrapiHeaders() }
      );
      
      if (!response.ok) {
        throw new Error(`Failed to fetch movie: ${response.statusText}`);
      }
      
      return response.json();
    },
    enabled: !!id && !!STRAPI_CONFIG.API_URL,
  });
}

export function useAddMovie() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (movieData: Partial<MovieEntity['attributes']>) => {
      const response = await fetch(
        `${STRAPI_CONFIG.API_URL}${STRAPI_CONFIG.ENDPOINTS.MOVIES}`,
        {
          method: 'POST',
          headers: getStrapiHeaders(),
          body: JSON.stringify({ data: movieData }),
        }
      );
      
      if (!response.ok) {
        throw new Error(`Failed to add movie: ${response.statusText}`);
      }
      
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['movies'] });
    },
  });
}

// ============================================================================
// Photos
// ============================================================================

export function usePhotos(options?: {
  albumId?: number;
  featured?: boolean;
  sort?: string;
}) {
  return useQuery({
    queryKey: ['photos', options],
    queryFn: async () => {
      const filters: Record<string, any> = {};
      if (options?.featured !== undefined) filters.featured = options.featured;
      if (options?.albumId) filters['album']['id'] = options.albumId;
      
      const query = buildStrapiQuery({
        populate: ['image', 'album'],
        filters,
        sort: options?.sort || 'capturedAt:desc',
      });
      
      const response = await fetch(
        `${STRAPI_CONFIG.API_URL}${STRAPI_CONFIG.ENDPOINTS.PHOTOS}${query}`,
        { headers: getStrapiHeaders() }
      );
      
      if (!response.ok) {
        throw new Error(`Failed to fetch photos: ${response.statusText}`);
      }
      
      return response.json() as Promise<PhotosResponse>;
    },
    enabled: !!STRAPI_CONFIG.API_URL,
  });
}

export function usePhotoAlbums() {
  return useQuery({
    queryKey: ['photo-albums'],
    queryFn: async () => {
      const query = buildStrapiQuery({
        populate: ['coverImage', 'photos'],
        sort: 'name:asc',
      });
      
      const response = await fetch(
        `${STRAPI_CONFIG.API_URL}${STRAPI_CONFIG.ENDPOINTS.PHOTO_ALBUMS}${query}`,
        { headers: getStrapiHeaders() }
      );
      
      if (!response.ok) {
        throw new Error(`Failed to fetch albums: ${response.statusText}`);
      }
      
      return response.json() as Promise<PhotoAlbumsResponse>;
    },
    enabled: !!STRAPI_CONFIG.API_URL,
  });
}

// ============================================================================
// Blog Posts
// ============================================================================

export function useBlogPosts(options?: {
  categoryId?: number;
  featured?: boolean;
  limit?: number;
}) {
  return useQuery({
    queryKey: ['blog-posts', options],
    queryFn: async () => {
      const filters: Record<string, any> = {};
      if (options?.featured !== undefined) filters.featured = options.featured;
      if (options?.categoryId) filters['category']['id'] = options.categoryId;
      
      const query = buildStrapiQuery({
        populate: ['coverImage', 'category'],
        filters,
        sort: 'publishedAt:desc',
        pagination: options?.limit ? { pageSize: options.limit } : undefined,
      });
      
      const response = await fetch(
        `${STRAPI_CONFIG.API_URL}${STRAPI_CONFIG.ENDPOINTS.BLOG_POSTS}${query}`,
        { headers: getStrapiHeaders() }
      );
      
      if (!response.ok) {
        throw new Error(`Failed to fetch blog posts: ${response.statusText}`);
      }
      
      return response.json() as Promise<BlogPostsResponse>;
    },
    enabled: !!STRAPI_CONFIG.API_URL,
  });
}

export function useBlogPost(slug: string) {
  return useQuery({
    queryKey: ['blog-post', slug],
    queryFn: async () => {
      const query = buildStrapiQuery({
        populate: ['coverImage', 'category'],
        filters: { slug },
      });
      
      const response = await fetch(
        `${STRAPI_CONFIG.API_URL}${STRAPI_CONFIG.ENDPOINTS.BLOG_POSTS}${query}`,
        { headers: getStrapiHeaders() }
      );
      
      if (!response.ok) {
        throw new Error(`Failed to fetch blog post: ${response.statusText}`);
      }
      
      const data = await response.json() as BlogPostsResponse;
      return data.data[0]; // Return first match
    },
    enabled: !!slug && !!STRAPI_CONFIG.API_URL,
  });
}

export function useBlogCategories() {
  return useQuery({
    queryKey: ['blog-categories'],
    queryFn: async () => {
      const query = buildStrapiQuery({
        sort: 'name:asc',
      });
      
      const response = await fetch(
        `${STRAPI_CONFIG.API_URL}${STRAPI_CONFIG.ENDPOINTS.BLOG_CATEGORIES}${query}`,
        { headers: getStrapiHeaders() }
      );
      
      if (!response.ok) {
        throw new Error(`Failed to fetch categories: ${response.statusText}`);
      }
      
      return response.json() as Promise<BlogCategoriesResponse>;
    },
    enabled: !!STRAPI_CONFIG.API_URL,
  });
}
