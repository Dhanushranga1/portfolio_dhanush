/**
 * TMDB (The Movie Database) API Integration
 * 
 * This service handles all TMDB API calls for fetching movie data,
 * posters, and metadata. Uses the official TMDB API v3.
 * 
 * API Documentation: https://developers.themoviedb.org/3
 */

import axios from 'axios';

// TMDB Configuration
const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY || '';
const TMDB_READ_ACCESS_TOKEN = import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN || '';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

// Image size options
export const TMDB_IMAGE_SIZES = {
  poster: {
    w92: 'w92',
    w154: 'w154',
    w185: 'w185',
    w342: 'w342',
    w500: 'w500',
    w780: 'w780',
    original: 'original',
  },
  backdrop: {
    w300: 'w300',
    w780: 'w780',
    w1280: 'w1280',
    original: 'original',
  },
};

// Create axios instance with default config
const tmdbApi = axios.create({
  baseURL: TMDB_BASE_URL,
  headers: {
    'Authorization': `Bearer ${TMDB_READ_ACCESS_TOKEN}`,
    'Content-Type': 'application/json',
  },
  params: {
    api_key: TMDB_API_KEY,
  },
});

// Types
export interface TMDBMovie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  adult: boolean;
  genre_ids: number[];
  original_language: string;
  video: boolean;
}

export interface TMDBMovieDetails extends TMDBMovie {
  budget: number;
  revenue: number;
  runtime: number;
  status: string;
  tagline: string;
  homepage: string;
  imdb_id: string;
  genres: { id: number; name: string }[];
  production_companies: { id: number; name: string; logo_path: string | null }[];
  production_countries: { iso_3166_1: string; name: string }[];
  spoken_languages: { iso_639_1: string; name: string }[];
  credits?: {
    cast: TMDBCastMember[];
    crew: TMDBCrewMember[];
  };
  videos?: {
    results: TMDBVideo[];
  };
}

export interface TMDBCastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
}

export interface TMDBCrewMember {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
}

export interface TMDBVideo {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  size: number;
  official: boolean;
}

export interface TMDBSearchResponse {
  page: number;
  results: TMDBMovie[];
  total_pages: number;
  total_results: number;
}

// Utility Functions

/**
 * Get full image URL from TMDB path
 */
export function getTMDBImageUrl(
  path: string | null,
  size: string = 'w500'
): string | null {
  if (!path) return null;
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
}

/**
 * Get YouTube trailer URL from TMDB video
 */
export function getYouTubeUrl(key: string): string {
  return `https://www.youtube.com/watch?v=${key}`;
}

/**
 * Get YouTube embed URL from TMDB video
 */
export function getYouTubeEmbedUrl(key: string): string {
  return `https://www.youtube.com/embed/${key}`;
}

/**
 * Extract director from crew members
 */
export function getDirector(crew: TMDBCrewMember[]): string | null {
  const director = crew.find((member) => member.job === 'Director');
  return director ? director.name : null;
}

/**
 * Get official trailer from videos
 */
export function getOfficialTrailer(videos: TMDBVideo[]): TMDBVideo | null {
  // Prefer official trailers
  const officialTrailer = videos.find(
    (v) => v.type === 'Trailer' && v.site === 'YouTube' && v.official
  );
  if (officialTrailer) return officialTrailer;

  // Fallback to any trailer
  const anyTrailer = videos.find(
    (v) => v.type === 'Trailer' && v.site === 'YouTube'
  );
  return anyTrailer || null;
}

// API Methods

/**
 * Search for movies by title
 */
export async function searchMovies(
  query: string,
  page: number = 1
): Promise<TMDBSearchResponse> {
  const response = await tmdbApi.get('/search/movie', {
    params: {
      query,
      page,
      include_adult: false,
    },
  });
  return response.data;
}

/**
 * Get detailed movie information by TMDB ID
 */
export async function getMovieDetails(
  movieId: number | string
): Promise<TMDBMovieDetails> {
  const response = await tmdbApi.get(`/movie/${movieId}`, {
    params: {
      append_to_response: 'credits,videos',
    },
  });
  return response.data;
}

/**
 * Get popular movies
 */
export async function getPopularMovies(
  page: number = 1
): Promise<TMDBSearchResponse> {
  const response = await tmdbApi.get('/movie/popular', {
    params: { page },
  });
  return response.data;
}

/**
 * Get top-rated movies
 */
export async function getTopRatedMovies(
  page: number = 1
): Promise<TMDBSearchResponse> {
  const response = await tmdbApi.get('/movie/top_rated', {
    params: { page },
  });
  return response.data;
}

/**
 * Get now playing movies
 */
export async function getNowPlayingMovies(
  page: number = 1
): Promise<TMDBSearchResponse> {
  const response = await tmdbApi.get('/movie/now_playing', {
    params: { page },
  });
  return response.data;
}

/**
 * Get upcoming movies
 */
export async function getUpcomingMovies(
  page: number = 1
): Promise<TMDBSearchResponse> {
  const response = await tmdbApi.get('/movie/upcoming', {
    params: { page },
  });
  return response.data;
}

/**
 * Get movie recommendations based on a movie ID
 */
export async function getMovieRecommendations(
  movieId: number | string,
  page: number = 1
): Promise<TMDBSearchResponse> {
  const response = await tmdbApi.get(`/movie/${movieId}/recommendations`, {
    params: { page },
  });
  return response.data;
}

/**
 * Get similar movies based on a movie ID
 */
export async function getSimilarMovies(
  movieId: number | string,
  page: number = 1
): Promise<TMDBSearchResponse> {
  const response = await tmdbApi.get(`/movie/${movieId}/similar`, {
    params: { page },
  });
  return response.data;
}

/**
 * Search for movies and get full details for first result
 * Useful for quickly adding movies to your collection
 */
export async function searchAndGetDetails(
  query: string
): Promise<TMDBMovieDetails | null> {
  const searchResults = await searchMovies(query, 1);
  
  if (searchResults.results.length === 0) {
    return null;
  }
  
  const firstResult = searchResults.results[0];
  return await getMovieDetails(firstResult.id);
}

/**
 * Format movie data for Strapi storage
 */
export function formatMovieForStrapi(movie: TMDBMovieDetails) {
  const director = movie.credits ? getDirector(movie.credits.crew) : null;
  const trailer = movie.videos ? getOfficialTrailer(movie.videos.results) : null;
  
  return {
    title: movie.title,
    year: movie.release_date ? new Date(movie.release_date).getFullYear() : null,
    director: director,
    genre: movie.genres.map((g) => g.name).join(', '),
    rating: Math.round(movie.vote_average * 10) / 10, // Convert 0-10 to 0-10 with 1 decimal
    tmdbId: movie.id,
    poster: getTMDBImageUrl(movie.poster_path, 'w500'),
    posterPath: movie.poster_path,
    overview: movie.overview,
    genres: movie.genres,
    trailer: trailer ? getYouTubeEmbedUrl(trailer.key) : null,
    trailerKey: trailer ? trailer.key : null,
    imdbId: movie.imdb_id,
    runtime: movie.runtime,
    tagline: movie.tagline,
    releaseDate: movie.release_date,
    voteAverage: movie.vote_average,
    voteCount: movie.vote_count,
    popularity: movie.popularity,
  };
}

// Export configuration
export const TMDB_CONFIG = {
  API_KEY: TMDB_API_KEY,
  READ_ACCESS_TOKEN: TMDB_READ_ACCESS_TOKEN,
  BASE_URL: TMDB_BASE_URL,
  IMAGE_BASE_URL: TMDB_IMAGE_BASE_URL,
};

export default {
  searchMovies,
  getMovieDetails,
  getPopularMovies,
  getTopRatedMovies,
  getNowPlayingMovies,
  getUpcomingMovies,
  getMovieRecommendations,
  getSimilarMovies,
  searchAndGetDetails,
  getTMDBImageUrl,
  getYouTubeUrl,
  getYouTubeEmbedUrl,
  getDirector,
  getOfficialTrailer,
  formatMovieForStrapi,
};
