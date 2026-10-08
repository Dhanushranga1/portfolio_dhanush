/**
 * React hooks for Strapi CMS integration
 *
 * These hooks use React Query for caching and state management. Every
 * query also reads a synchronous localStorage cache as placeholderData,
 * so a visitor who has loaded the site before sees real content
 * instantly (no loading skeleton) even if Strapi is cold-starting or
 * briefly down — see @/lib/strapiCache for details.
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { STRAPI_CONFIG, getStrapiHeaders, buildStrapiQuery } from '@/lib/strapiConfig';
import { withStrapiFallback, cachePlaceholder } from '@/lib/strapiCache';
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
  BlogPostEntity,
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
  const filters: Record<string, any> = {};
  if (options?.featured !== undefined) filters.featured = options.featured;
  const query = buildStrapiQuery({ populate: ['coverImage'], filters, sort: 'order:asc' });
  const cacheKey = `${STRAPI_CONFIG.ENDPOINTS.PROJECTS}${query}`;

  return useQuery({
    queryKey: ['projects', options],
    queryFn: () => strapiFetch<ProjectsResponse>(STRAPI_CONFIG.ENDPOINTS.PROJECTS, query),
    placeholderData: cachePlaceholder<ProjectsResponse>(cacheKey),
    enabled: !!STRAPI_CONFIG.API_URL,
  });
}

// ============================================================================
// Experience & Skills
// ============================================================================

export function useExperiences() {
  const query = buildStrapiQuery({ sort: 'order:asc' });
  const cacheKey = `${STRAPI_CONFIG.ENDPOINTS.EXPERIENCES}${query}`;

  return useQuery({
    queryKey: ['experiences'],
    queryFn: () => strapiFetch<ExperiencesResponse>(STRAPI_CONFIG.ENDPOINTS.EXPERIENCES, query),
    placeholderData: cachePlaceholder<ExperiencesResponse>(cacheKey),
    enabled: !!STRAPI_CONFIG.API_URL,
  });
}

export function useSkills() {
  const query = buildStrapiQuery({ sort: 'order:asc' });
  const cacheKey = `${STRAPI_CONFIG.ENDPOINTS.SKILLS}${query}`;

  return useQuery({
    queryKey: ['skills'],
    queryFn: () => strapiFetch<SkillsResponse>(STRAPI_CONFIG.ENDPOINTS.SKILLS, query),
    placeholderData: cachePlaceholder<SkillsResponse>(cacheKey),
    enabled: !!STRAPI_CONFIG.API_URL,
  });
}

// ============================================================================
// Home Page & Site Settings
// ============================================================================

export function useHomePage() {
  const cacheKey = STRAPI_CONFIG.ENDPOINTS.HOME_PAGE;

  return useQuery({
    queryKey: ['home-page'],
    queryFn: () => strapiFetch<HomePageResponse>(STRAPI_CONFIG.ENDPOINTS.HOME_PAGE),
    placeholderData: cachePlaceholder<HomePageResponse>(cacheKey),
    enabled: !!STRAPI_CONFIG.API_URL,
  });
}

export function useSiteSettings() {
  const query = buildStrapiQuery({ populate: ['resumeFile'] });
  const cacheKey = `${STRAPI_CONFIG.ENDPOINTS.SITE_SETTING}${query}`;

  return useQuery({
    queryKey: ['site-setting'],
    queryFn: () => strapiFetch<SiteSettingResponse>(STRAPI_CONFIG.ENDPOINTS.SITE_SETTING, query),
    placeholderData: cachePlaceholder<SiteSettingResponse>(cacheKey),
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
  const filters: Record<string, any> = {};
  if (options?.favorite !== undefined) filters.favorite = options.favorite;
  if (options?.watched !== undefined) filters.watched = options.watched;
  const query = buildStrapiQuery({
    populate: ['poster'],
    filters,
    sort: options?.sort || 'rating:desc',
  });
  const cacheKey = `${STRAPI_CONFIG.ENDPOINTS.MOVIES}${query}`;

  return useQuery({
    queryKey: ['movies', options],
    queryFn: () => strapiFetch<MoviesResponse>(STRAPI_CONFIG.ENDPOINTS.MOVIES, query),
    placeholderData: cachePlaceholder<MoviesResponse>(cacheKey),
    enabled: !!STRAPI_CONFIG.API_URL,
  });
}

export function useMovie(id: number) {
  const query = buildStrapiQuery({ populate: ['poster'] });
  const cacheKey = `${STRAPI_CONFIG.ENDPOINTS.MOVIES}/${id}${query}`;

  return useQuery({
    queryKey: ['movie', id],
    queryFn: () => strapiFetch<any>(`${STRAPI_CONFIG.ENDPOINTS.MOVIES}/${id}`, query),
    placeholderData: cachePlaceholder<any>(cacheKey),
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
  const filters: Record<string, any> = {};
  if (options?.albumId) filters.photo_album = { id: options.albumId };
  const query = buildStrapiQuery({
    populate: ['image', 'photo_album'],
    filters,
    sort: options?.sort || 'dateTaken:desc',
  });
  const cacheKey = `${STRAPI_CONFIG.ENDPOINTS.PHOTOS}${query}`;

  return useQuery({
    queryKey: ['photos', options],
    queryFn: () => strapiFetch<PhotosResponse>(STRAPI_CONFIG.ENDPOINTS.PHOTOS, query),
    placeholderData: cachePlaceholder<PhotosResponse>(cacheKey),
    enabled: !!STRAPI_CONFIG.API_URL,
  });
}

export function usePhotoAlbums() {
  const query = buildStrapiQuery({ populate: ['coverImage', 'photos'], sort: 'title:asc' });
  const cacheKey = `${STRAPI_CONFIG.ENDPOINTS.PHOTO_ALBUMS}${query}`;

  return useQuery({
    queryKey: ['photo-albums'],
    queryFn: () => strapiFetch<PhotoAlbumsResponse>(STRAPI_CONFIG.ENDPOINTS.PHOTO_ALBUMS, query),
    placeholderData: cachePlaceholder<PhotoAlbumsResponse>(cacheKey),
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
  const filters: Record<string, any> = {};
  if (options?.featured !== undefined) filters.featured = options.featured;
  if (options?.categoryId) filters.blog_category = { id: options.categoryId };
  const query = buildStrapiQuery({
    populate: ['coverImage', 'blog_category'],
    filters,
    sort: 'publishedAt:desc',
    pagination: options?.limit ? { pageSize: options.limit } : undefined,
  });
  const cacheKey = `${STRAPI_CONFIG.ENDPOINTS.BLOG_POSTS}${query}`;

  return useQuery({
    queryKey: ['blog-posts', options],
    queryFn: () => strapiFetch<BlogPostsResponse>(STRAPI_CONFIG.ENDPOINTS.BLOG_POSTS, query),
    placeholderData: cachePlaceholder<BlogPostsResponse>(cacheKey),
    enabled: !!STRAPI_CONFIG.API_URL,
  });
}

export function useBlogPost(slug: string) {
  const query = buildStrapiQuery({ populate: ['coverImage', 'blog_category'], filters: { slug } });
  const cacheKey = `${STRAPI_CONFIG.ENDPOINTS.BLOG_POSTS}${query}`;

  return useQuery({
    queryKey: ['blog-post', slug],
    queryFn: async () => {
      const data = await strapiFetch<BlogPostsResponse>(STRAPI_CONFIG.ENDPOINTS.BLOG_POSTS, query);
      return data.data[0] ?? null;
    },
    placeholderData: () => cachePlaceholder<BlogPostsResponse>(cacheKey)?.data[0] ?? undefined,
    enabled: !!slug && !!STRAPI_CONFIG.API_URL,
  });
}

export function useBlogCategories() {
  const query = buildStrapiQuery({ sort: 'name:asc' });
  const cacheKey = `${STRAPI_CONFIG.ENDPOINTS.BLOG_CATEGORIES}${query}`;

  return useQuery({
    queryKey: ['blog-categories'],
    queryFn: () => strapiFetch<BlogCategoriesResponse>(STRAPI_CONFIG.ENDPOINTS.BLOG_CATEGORIES, query),
    placeholderData: cachePlaceholder<BlogCategoriesResponse>(cacheKey),
    enabled: !!STRAPI_CONFIG.API_URL,
  });
}
