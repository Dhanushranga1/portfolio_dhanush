/**
 * Strapi Movies API Service
 * 
 * This service handles all interactions with the Strapi CMS for movies,
 * including fetching, creating, updating, and deleting movie entries.
 */

import axios from 'axios';
import type { TMDBMovieDetails } from './tmdb';
import { formatMovieForStrapi } from './tmdb';

const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = import.meta.env.VITE_STRAPI_TOKEN || import.meta.env.VITE_STRAPI_API_TOKEN || '';

// Create axios instance with Strapi config
const strapiApi = axios.create({
  baseURL: STRAPI_URL,
  headers: {
    'Authorization': `Bearer ${STRAPI_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

// Types matching your Strapi Movie content type
export interface StrapiMovie {
  id: number;
  attributes: {
    title: string;
    year: number;
    rating: number;
    personalNotes?: string;
    watched: boolean;
    tmdbId: number;
    posterPath?: string;
    overview?: string;
    genres?: any;
    director?: string;
    trailer?: string;
    imdbId?: string;
    runtime?: number;
    tagline?: string;
    releaseDate?: string;
    favorite?: boolean;
    watchedDate?: string;
    tags?: string[];
    createdAt: string;
    updatedAt: string;
    publishedAt?: string;
  };
}

export interface StrapiMovieInput {
  title: string;
  year: number;
  rating: number;
  personalNotes?: string;
  watched?: boolean;
  tmdbId: number;
  posterPath?: string;
  overview?: string;
  genres?: any;
  director?: string;
  trailer?: string;
  imdbId?: string;
  runtime?: number;
  tagline?: string;
  releaseDate?: string;
  favorite?: boolean;
  watchedDate?: string;
  tags?: string[];
}

export interface StrapiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// API Methods

/**
 * Get all movies from Strapi
 */
export async function getAllMovies(): Promise<StrapiMovie[]> {
  try {
    const response = await strapiApi.get<StrapiResponse<StrapiMovie[]>>('/api/movies', {
      params: {
        populate: '*',
        sort: 'createdAt:desc',
      },
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching movies from Strapi:', error);
    return [];
  }
}

/**
 * Get a single movie by ID
 */
export async function getMovieById(id: number): Promise<StrapiMovie | null> {
  try {
    const response = await strapiApi.get<StrapiResponse<StrapiMovie>>(`/api/movies/${id}`, {
      params: {
        populate: '*',
      },
    });
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching movie ${id} from Strapi:`, error);
    return null;
  }
}

/**
 * Get a movie by TMDB ID
 */
export async function getMovieByTmdbId(tmdbId: number): Promise<StrapiMovie | null> {
  try {
    const response = await strapiApi.get<StrapiResponse<StrapiMovie[]>>('/api/movies', {
      params: {
        'filters[tmdbId][$eq]': tmdbId,
        populate: '*',
      },
    });
    return response.data.data[0] || null;
  } catch (error) {
    console.error(`Error fetching movie with TMDB ID ${tmdbId}:`, error);
    return null;
  }
}

/**
 * Create a new movie in Strapi
 */
export async function createMovie(movieData: StrapiMovieInput): Promise<StrapiMovie | null> {
  try {
    const response = await strapiApi.post<StrapiResponse<StrapiMovie>>('/api/movies', {
      data: movieData,
    });
    return response.data.data;
  } catch (error) {
    console.error('Error creating movie in Strapi:', error);
    throw error;
  }
}

/**
 * Update an existing movie in Strapi
 */
export async function updateMovie(
  id: number,
  movieData: Partial<StrapiMovieInput>
): Promise<StrapiMovie | null> {
  try {
    const response = await strapiApi.put<StrapiResponse<StrapiMovie>>(`/api/movies/${id}`, {
      data: movieData,
    });
    return response.data.data;
  } catch (error) {
    console.error(`Error updating movie ${id} in Strapi:`, error);
    throw error;
  }
}

/**
 * Delete a movie from Strapi
 */
export async function deleteMovie(id: number): Promise<boolean> {
  try {
    await strapiApi.delete(`/api/movies/${id}`);
    return true;
  } catch (error) {
    console.error(`Error deleting movie ${id} from Strapi:`, error);
    return false;
  }
}

/**
 * Get favorite movies
 */
export async function getFavoriteMovies(): Promise<StrapiMovie[]> {
  try {
    const response = await strapiApi.get<StrapiResponse<StrapiMovie[]>>('/api/movies', {
      params: {
        'filters[favorite][$eq]': true,
        populate: '*',
        sort: 'createdAt:desc',
      },
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching favorite movies from Strapi:', error);
    return [];
  }
}

/**
 * Get watched movies
 */
export async function getWatchedMovies(): Promise<StrapiMovie[]> {
  try {
    const response = await strapiApi.get<StrapiResponse<StrapiMovie[]>>('/api/movies', {
      params: {
        'filters[watched][$eq]': true,
        populate: '*',
        sort: 'watchedDate:desc',
      },
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching watched movies from Strapi:', error);
    return [];
  }
}

/**
 * Toggle favorite status of a movie
 */
export async function toggleMovieFavorite(id: number, currentStatus: boolean): Promise<boolean> {
  try {
    await updateMovie(id, { favorite: !currentStatus });
    return true;
  } catch (error) {
    console.error(`Error toggling favorite status for movie ${id}:`, error);
    return false;
  }
}

/**
 * Toggle watched status of a movie
 */
export async function toggleMovieWatched(
  id: number,
  currentStatus: boolean
): Promise<boolean> {
  try {
    await updateMovie(id, {
      watched: !currentStatus,
      watchedDate: !currentStatus ? new Date().toISOString() : undefined,
    });
    return true;
  } catch (error) {
    console.error(`Error toggling watched status for movie ${id}:`, error);
    return false;
  }
}

/**
 * Update movie rating
 */
export async function updateMovieRating(id: number, rating: number): Promise<boolean> {
  try {
    await updateMovie(id, { rating });
    return true;
  } catch (error) {
    console.error(`Error updating rating for movie ${id}:`, error);
    return false;
  }
}

/**
 * Update movie notes
 */
export async function updateMovieNotes(id: number, notes: string): Promise<boolean> {
  try {
    await updateMovie(id, { personalNotes: notes });
    return true;
  } catch (error) {
    console.error(`Error updating notes for movie ${id}:`, error);
    return false;
  }
}

/**
 * Add a movie from TMDB data
 * This combines TMDB API data with Strapi storage
 */
export async function addMovieFromTMDB(
  tmdbMovie: TMDBMovieDetails,
  additionalData?: Partial<StrapiMovieInput>
): Promise<StrapiMovie | null> {
  try {
    // Check if movie already exists
    const existingMovie = await getMovieByTmdbId(tmdbMovie.id);
    if (existingMovie) {
      console.log('Movie already exists in Strapi');
      return existingMovie;
    }

    // Format TMDB data for Strapi
    const formattedData = formatMovieForStrapi(tmdbMovie);

    // Merge with additional data (personalNotes, favorite, etc.)
    const movieData: StrapiMovieInput = {
      title: formattedData.title,
      year: formattedData.year || new Date().getFullYear(),
      rating: formattedData.rating || 0,
      tmdbId: formattedData.tmdbId,
      posterPath: formattedData.posterPath || undefined,
      overview: formattedData.overview,
      genres: formattedData.genres,
      director: formattedData.director || undefined,
      trailer: formattedData.trailer || undefined,
      imdbId: formattedData.imdbId || undefined,
      runtime: formattedData.runtime || undefined,
      tagline: formattedData.tagline || undefined,
      releaseDate: formattedData.releaseDate || undefined,
      watched: false,
      favorite: false,
      tags: [],
      ...additionalData,
    };

    // Create movie in Strapi
    return await createMovie(movieData);
  } catch (error) {
    console.error('Error adding movie from TMDB:', error);
    throw error;
  }
}

/**
 * Search movies in Strapi
 */
export async function searchMoviesInStrapi(query: string): Promise<StrapiMovie[]> {
  try {
    const response = await strapiApi.get<StrapiResponse<StrapiMovie[]>>('/api/movies', {
      params: {
        'filters[$or][0][title][$containsi]': query,
        'filters[$or][1][director][$containsi]': query,
        populate: '*',
      },
    });
    return response.data.data;
  } catch (error) {
    console.error('Error searching movies in Strapi:', error);
    return [];
  }
}

/**
 * Export movies to JSON
 */
export function exportMoviesToJSON(movies: StrapiMovie[]): void {
  const dataStr = JSON.stringify(movies, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `movies-export-${new Date().toISOString().split('T')[0]}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

// Export configuration
export const STRAPI_CONFIG = {
  URL: STRAPI_URL,
  TOKEN: STRAPI_TOKEN,
  ENDPOINTS: {
    MOVIES: '/api/movies',
  },
};

export default {
  getAllMovies,
  getMovieById,
  getMovieByTmdbId,
  createMovie,
  updateMovie,
  deleteMovie,
  getFavoriteMovies,
  getWatchedMovies,
  toggleMovieFavorite,
  toggleMovieWatched,
  updateMovieRating,
  updateMovieNotes,
  addMovieFromTMDB,
  searchMoviesInStrapi,
  exportMoviesToJSON,
};
