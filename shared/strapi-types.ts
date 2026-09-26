/**
 * Strapi CMS Type Definitions (Strapi v5)
 *
 * Strapi v5's REST API returns entities with attributes flattened onto
 * the entity itself (no v4-style `data.attributes` wrapper).
 */

// Base Strapi types
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

export interface StrapiImage {
  id: number;
  documentId: string;
  name: string;
  alternativeText?: string;
  caption?: string;
  width: number;
  height: number;
  formats?: {
    thumbnail?: StrapiImageFormat;
    small?: StrapiImageFormat;
    medium?: StrapiImageFormat;
    large?: StrapiImageFormat;
  };
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

// A v5 entity: id + documentId + attributes flattened + system fields
export type StrapiEntity<T> = T & {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
};

// Project content type
export interface StrapiProject {
  title: string;
  slug: string;
  summary: string;
  description?: string;
  impact?: string;
  tags?: string[];
  liveUrl?: string;
  githubUrl?: string;
  status: 'deployed' | 'active' | 'archived';
  coverImage?: StrapiImage | null;
  featured: boolean;
  order?: number;
}

// Experience content type
export interface StrapiExperience {
  title: string;
  company: string;
  location?: string;
  period: string;
  current: boolean;
  bullets?: string[];
  order?: number;
}

// Skill content type
export interface StrapiSkill {
  label: string;
  category: 'lang' | 'framework' | 'infra' | 'data';
  order?: number;
}

// Home Page (single type)
export interface StrapiHomePage {
  heading: string;
  subheading?: string;
  bio?: string;
  primaryCtaLabel?: string;
  primaryCtaUrl?: string;
  secondaryCtaLabel?: string;
  secondaryCtaUrl?: string;
}

// Site Settings (single type)
export interface StrapiSiteSetting {
  fullName: string;
  role?: string;
  email?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  resumeFile?: StrapiImage | null;
  contactIntro?: string;
  bio?: string;
  education?: Array<{
    degree: string;
    institution: string;
    detail?: string;
    period: string;
  }>;
  achievements?: string[];
}

// Movie content type
export interface StrapiMovie {
  title: string;
  year: number;
  director?: string;
  rating?: number;
  personalNotes?: string;
  watched: boolean;
  tmdbId?: number;
  posterPath?: string;
  overview?: string;
  genres?: string[];
  favorite: boolean;
  trailerUrl?: string;
  poster?: StrapiImage | null;
}

// Photo content type
export interface StrapiPhoto {
  title: string;
  description?: string;
  image: StrapiImage;
  photo_album?: StrapiEntity<StrapiPhotoAlbum> | null;
  tags?: string[];
  dateTaken?: string;
  camera?: string;
  location?: string;
}

// Photo Album content type
export interface StrapiPhotoAlbum {
  title: string;
  description?: string;
  coverImage?: StrapiImage | null;
  date?: string;
  photos?: StrapiEntity<StrapiPhoto>[];
}

// Blog Post content type
export interface StrapiBlogPost {
  title: string;
  slug: string;
  content: unknown; // Strapi "blocks" rich text (structured JSON)
  excerpt?: string;
  coverImage?: StrapiImage | null;
  blog_category?: StrapiEntity<StrapiBlogCategory> | null;
  tags?: string[];
  featured: boolean;
  readTime?: number;
}

// Blog Category content type
export interface StrapiBlogCategory {
  name: string;
  slug: string;
  description?: string;
  blog_posts?: StrapiEntity<StrapiBlogPost>[];
}

// Utility types
export type ProjectEntity = StrapiEntity<StrapiProject>;
export type ExperienceEntity = StrapiEntity<StrapiExperience>;
export type SkillEntity = StrapiEntity<StrapiSkill>;
export type MovieEntity = StrapiEntity<StrapiMovie>;
export type PhotoEntity = StrapiEntity<StrapiPhoto>;
export type PhotoAlbumEntity = StrapiEntity<StrapiPhotoAlbum>;
export type BlogPostEntity = StrapiEntity<StrapiBlogPost>;
export type BlogCategoryEntity = StrapiEntity<StrapiBlogCategory>;

export type ProjectsResponse = StrapiResponse<ProjectEntity[]>;
export type ExperiencesResponse = StrapiResponse<ExperienceEntity[]>;
export type SkillsResponse = StrapiResponse<SkillEntity[]>;
export type HomePageResponse = StrapiResponse<StrapiEntity<StrapiHomePage>>;
export type SiteSettingResponse = StrapiResponse<StrapiEntity<StrapiSiteSetting>>;
export type MoviesResponse = StrapiResponse<MovieEntity[]>;
export type MovieResponse = StrapiResponse<MovieEntity>;
export type PhotosResponse = StrapiResponse<PhotoEntity[]>;
export type PhotoResponse = StrapiResponse<PhotoEntity>;
export type PhotoAlbumsResponse = StrapiResponse<PhotoAlbumEntity[]>;
export type BlogPostsResponse = StrapiResponse<BlogPostEntity[]>;
export type BlogPostResponse = StrapiResponse<BlogPostEntity>;
export type BlogCategoriesResponse = StrapiResponse<BlogCategoryEntity[]>;
