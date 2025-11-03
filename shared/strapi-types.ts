/**
 * Strapi CMS Type Definitions
 * 
 * Type-safe interfaces for Strapi content types
 */

// Base Strapi types
export interface StrapiImage {
  id: number;
  name: string;
  alternativeText?: string;
  caption?: string;
  width: number;
  height: number;
  formats: {
    thumbnail?: StrapiImageFormat;
    small?: StrapiImageFormat;
    medium?: StrapiImageFormat;
    large?: StrapiImageFormat;
  };
  url: string;
}

export interface StrapiImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  url: string;
}

export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiEntity<T> {
  id: number;
  attributes: T & {
    createdAt: string;
    updatedAt: string;
    publishedAt?: string;
  };
}

// Movie content type
export interface StrapiMovie {
  title: string;
  year: number;
  director?: string;
  genre: string[];
  rating?: number; // User's personal rating (1-10)
  watched: boolean;
  watchedDate?: string;
  poster?: { data: StrapiEntity<StrapiImage> | null };
  tmdbId?: string; // Link to TMDb for additional data
  notes?: string; // Personal notes (markdown supported)
  tags?: string[];
  favorite: boolean;
}

// Photo content type
export interface StrapiPhoto {
  title: string;
  description?: string;
  image: { data: StrapiEntity<StrapiImage> };
  album?: { data: StrapiEntity<StrapiPhotoAlbum> | null };
  tags?: string[];
  location?: string;
  capturedAt?: string;
  camera?: string;
  featured: boolean;
}

// Photo Album content type
export interface StrapiPhotoAlbum {
  name: string;
  description?: string;
  coverImage?: { data: StrapiEntity<StrapiImage> | null };
  photos?: { data: StrapiEntity<StrapiPhoto>[] };
  slug: string;
}

// Blog Post content type
export interface StrapiBlogPost {
  title: string;
  slug: string;
  excerpt?: string;
  content: string; // Rich text / Markdown
  coverImage?: { data: StrapiEntity<StrapiImage> | null };
  category?: { data: StrapiEntity<StrapiBlogCategory> | null };
  tags?: string[];
  featured: boolean;
  readTime?: number; // minutes
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string;
  };
}

// Blog Category content type
export interface StrapiBlogCategory {
  name: string;
  slug: string;
  description?: string;
  posts?: { data: StrapiEntity<StrapiBlogPost>[] };
}

// Utility types
export type MovieEntity = StrapiEntity<StrapiMovie>;
export type PhotoEntity = StrapiEntity<StrapiPhoto>;
export type PhotoAlbumEntity = StrapiEntity<StrapiPhotoAlbum>;
export type BlogPostEntity = StrapiEntity<StrapiBlogPost>;
export type BlogCategoryEntity = StrapiEntity<StrapiBlogCategory>;

export type MoviesResponse = StrapiResponse<MovieEntity[]>;
export type MovieResponse = StrapiResponse<MovieEntity>;
export type PhotosResponse = StrapiResponse<PhotoEntity[]>;
export type PhotoResponse = StrapiResponse<PhotoEntity>;
export type PhotoAlbumsResponse = StrapiResponse<PhotoAlbumEntity[]>;
export type BlogPostsResponse = StrapiResponse<BlogPostEntity[]>;
export type BlogPostResponse = StrapiResponse<BlogPostEntity>;
export type BlogCategoriesResponse = StrapiResponse<BlogCategoryEntity[]>;
