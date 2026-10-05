/**
 * React hooks for Strapi CMS integration
 *
 * These hooks use React Query for caching and state management
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { STRAPI_CONFIG, getStrapiHeaders, buildStrapiQuery } from '@/lib/strapiConfig';
import { withStrapiFallback } from '@/lib/strapiCache';
import type {
  ProjectsResponse,
  ExperiencesResponse,
  SkillsResponse,
  HomePageResponse,
  SiteSettingResponse,
  MoviesResponse,
  PhotosResponse,
  PhotoAlbumsResponse,
  BlogPostsResponse,
  BlogCategoriesResponse,
  MovieEntity,
} from '@shared/strapi-types';

async function strapiFetch<T>(endpoint: string, query = ''): Promise<T> {
  const cacheKey = `${endpoint}${query}`;
  return withStrapiFallback(cacheKey, async () => {
    const response = await fetch(`${STRAPI_CONFIG.API_URL}${endpoint}${query}`, {
      headers: getStrapiHeaders(),
    });
    if (!response.ok) {
      throw new Error(`Strapi request failed (${response.status}): ${endpoint}`);
    }
    return response.json() as Promise<T>;
  });
}

// ============================================================================
// Projects
// ============================================================================

export function useProjects(options?: { featured?: boolean }) {
  return useQuery({
    queryKey: ['projects', options],
    queryFn: () => {
      const filters: Record<string, any> = {};
      if (options?.featured !== undefined) filters.featured = options.featured;

      const query = buildStrapiQuery({
        populate: ['coverImage'],
        filters,
        sort: 'order:asc',
      });
      return strapiFetch<ProjectsResponse>(STRAPI_CONFIG.ENDPOINTS.PROJECTS, query);
    },
    enabled: !!STRAPI_CONFIG.API_URL,
  });
}

// ============================================================================
// Experience & Skills
// ============================================================================

export function useExperiences() {
  return useQuery({
    queryKey: ['experiences'],
    queryFn: () => {
      const query = buildStrapiQuery({ sort: 'order:asc' });
      return strapiFetch<ExperiencesResponse>(STRAPI_CONFIG.ENDPOINTS.EXPERIENCES, query);
    },
    enabled: !!STRAPI_CONFIG.API_URL,
  });
}

export function useSkills() {
  return useQuery({
    queryKey: ['skills'],
    queryFn: () => {
      const query = buildStrapiQuery({ sort: 'order:asc' });
      return strapiFetch<SkillsResponse>(STRAPI_CONFIG.ENDPOINTS.SKILLS, query);
    },
    enabled: !!STRAPI_CONFIG.API_URL,
  });
}

// ============================================================================
// Home Page & Site Settings
// ============================================================================

export function useHomePage() {
  return useQuery({
    queryKey: ['home-page'],
    queryFn: () => strapiFetch<HomePageResponse>(STRAPI_CONFIG.ENDPOINTS.HOME_PAGE),
    enabled: !!STRAPI_CONFIG.API_URL,
  });
}

export function useSiteSettings() {
  return useQuery({
    queryKey: ['site-setting'],
    queryFn: () => {
      const query = buildStrapiQuery({ populate: ['resumeFile'] });
      return strapiFetch<SiteSettingResponse>(STRAPI_CONFIG.ENDPOINTS.SITE_SETTING, query);
    },
    enabled: !!STRAPI_CONFIG.API_URL,
  });
}

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
    queryFn: () => {
      const filters: Record<string, any> = {};
      if (options?.favorite !== undefined) filters.favorite = options.favorite;
      if (options?.watched !== undefined) filters.watched = options.watched;

      const query = buildStrapiQuery({
        populate: ['poster'],
        filters,
        sort: options?.sort || 'rating:desc',
      });
      return strapiFetch<MoviesResponse>(STRAPI_CONFIG.ENDPOINTS.MOVIES, query);
    },
    enabled: !!STRAPI_CONFIG.API_URL,
  });
}

export function useMovie(id: number) {
  return useQuery({
    queryKey: ['movie', id],
    queryFn: () => {
      const query = buildStrapiQuery({ populate: ['poster'] });
      return strapiFetch<any>(`${STRAPI_CONFIG.ENDPOINTS.MOVIES}/${id}`, query);
    },
    enabled: !!id && !!STRAPI_CONFIG.API_URL,
  });
}

export function useAddMovie() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (movieData: Partial<MovieEntity>) => {
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
  sort?: string;
}) {
  return useQuery({
    queryKey: ['photos', options],
    queryFn: () => {
      const filters: Record<string, any> = {};
      if (options?.albumId) filters.photo_album = { id: options.albumId };

      const query = buildStrapiQuery({
        populate: ['image', 'photo_album'],
        filters,
        sort: options?.sort || 'dateTaken:desc',
      });
      return strapiFetch<PhotosResponse>(STRAPI_CONFIG.ENDPOINTS.PHOTOS, query);
    },
    enabled: !!STRAPI_CONFIG.API_URL,
  });
}

export function usePhotoAlbums() {
  return useQuery({
    queryKey: ['photo-albums'],
    queryFn: () => {
      const query = buildStrapiQuery({
        populate: ['coverImage', 'photos'],
        sort: 'title:asc',
      });
      return strapiFetch<PhotoAlbumsResponse>(STRAPI_CONFIG.ENDPOINTS.PHOTO_ALBUMS, query);
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
    queryFn: () => {
      const filters: Record<string, any> = {};
      if (options?.featured !== undefined) filters.featured = options.featured;
      if (options?.categoryId) filters.blog_category = { id: options.categoryId };

      const query = buildStrapiQuery({
        populate: ['coverImage', 'blog_category'],
        filters,
        sort: 'publishedAt:desc',
        pagination: options?.limit ? { pageSize: options.limit } : undefined,
      });
      return strapiFetch<BlogPostsResponse>(STRAPI_CONFIG.ENDPOINTS.BLOG_POSTS, query);
    },
    enabled: !!STRAPI_CONFIG.API_URL,
  });
}

export function useBlogPost(slug: string) {
  return useQuery({
    queryKey: ['blog-post', slug],
    queryFn: async () => {
      const query = buildStrapiQuery({
        populate: ['coverImage', 'blog_category'],
        filters: { slug },
      });
      const data = await strapiFetch<BlogPostsResponse>(STRAPI_CONFIG.ENDPOINTS.BLOG_POSTS, query);
      return data.data[0] ?? null;
    },
    enabled: !!slug && !!STRAPI_CONFIG.API_URL,
  });
}

export function useBlogCategories() {
  return useQuery({
    queryKey: ['blog-categories'],
    queryFn: () => {
      const query = buildStrapiQuery({ sort: 'name:asc' });
      return strapiFetch<BlogCategoriesResponse>(STRAPI_CONFIG.ENDPOINTS.BLOG_CATEGORIES, query);
    },
    enabled: !!STRAPI_CONFIG.API_URL,
  });
}
