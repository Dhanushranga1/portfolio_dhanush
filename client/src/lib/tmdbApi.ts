/**
 * TMDb API Integration
 * 
 * The Movie Database (TMDb) API for fetching movie data
 * Free API key required from: https://developer.themoviedb.org/docs/getting-started
 */

const TMDB_API_BASE = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p';

// Get API key from environment variable
const API_KEY = import.meta.env.VITE_TMDB_API_KEY || '';

/**
 * TMDb Image Configuration
 * Poster sizes: w92, w154, w185, w342, w500, w780, original
 * Backdrop sizes: w300, w780, w1280, original
 */
export const TMDB_IMAGE_SIZES = {
  poster: {
    small: 'w185',
    medium: 'w342',
    large: 'w500',
    original: 'original',
  },
  backdrop: {
    small: 'w300',
    medium: 'w780',
    large: 'w1280',
    original: 'original',
  },
};

/**
 * Build TMDb image URL
 */
export function getTMDbImageUrl(
  path: string | null,
  type: 'poster' | 'backdrop' = 'poster',
  size: 'small' | 'medium' | 'large' | 'original' = 'medium'
): string | null {
  if (!path) return null;
  const sizeStr = TMDB_IMAGE_SIZES[type][size];
  return `${TMDB_IMAGE_BASE}/${sizeStr}${path}`;
}

/**
 * TMDb API Response Types
 */
export interface TMDbMovie {
  id: number;
  imdb_id?: string;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  genres: Array<{ id: number; name: string }>;
  vote_average: number;
  vote_count: number;
  runtime: number | null;
  tagline: string;
  status: string;
  budget: number;
  revenue: number;
  spoken_languages: Array<{ iso_639_1: string; name: string }>;
  production_countries: Array<{ iso_3166_1: string; name: string }>;
  credits?: {
    cast: Array<{
      id: number;
      name: string;
      character: string;
      profile_path: string | null;
    }>;
    crew: Array<{
      id: number;
      name: string;
      job: string;
      department: string;
      profile_path: string | null;
    }>;
  };
  videos?: {
    results: Array<{
      id: string;
      key: string;
      name: string;
      site: string;
      type: string;
      official: boolean;
    }>;
  };
}

export interface TMDbSearchResult {
  page: number;
  results: Array<{
    id: number;
    title: string;
    original_title: string;
    overview: string;
    poster_path: string | null;
    backdrop_path: string | null;
    release_date: string;
    genre_ids: number[];
    vote_average: number;
    vote_count: number;
    popularity: number;
  }>;
  total_pages: number;
  total_results: number;
}

/**
 * Search movies by title
 */
export async function searchMovies(
  query: string,
  page: number = 1
): Promise<TMDbSearchResult> {
  if (!API_KEY) {
    throw new Error('TMDb API key not configured. Please set VITE_TMDB_API_KEY in .env');
  }

  const url = new URL(`${TMDB_API_BASE}/search/movie`);
  url.searchParams.set('api_key', API_KEY);
  url.searchParams.set('query', query);
  url.searchParams.set('page', page.toString());
  url.searchParams.set('include_adult', 'false');

  const response = await fetch(url.toString());
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ status_message: 'Unknown error' }));
    throw new Error(`TMDb API error: ${error.status_message || response.statusText}`);
  }

  return response.json();
}

/**
 * Get detailed movie information by TMDb ID
 */
export async function getMovieDetails(
  movieId: number,
  includeCredits: boolean = true,
  includeVideos: boolean = true
): Promise<TMDbMovie> {
  if (!API_KEY) {
    throw new Error('TMDb API key not configured. Please set VITE_TMDB_API_KEY in .env');
  }

  const url = new URL(`${TMDB_API_BASE}/movie/${movieId}`);
  url.searchParams.set('api_key', API_KEY);
  
  const appendToResponse: string[] = [];
  if (includeCredits) appendToResponse.push('credits');
  if (includeVideos) appendToResponse.push('videos');
  if (appendToResponse.length > 0) {
    url.searchParams.set('append_to_response', appendToResponse.join(','));
  }

  const response = await fetch(url.toString());
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ status_message: 'Unknown error' }));
    throw new Error(`TMDb API error: ${error.status_message || response.statusText}`);
  }

  return response.json();
}

/**
 * Get movie by IMDb ID
 */
export async function getMovieByImdbId(imdbId: string): Promise<TMDbMovie> {
  if (!API_KEY) {
    throw new Error('TMDb API key not configured. Please set VITE_TMDB_API_KEY in .env');
  }

  const url = new URL(`${TMDB_API_BASE}/find/${imdbId}`);
  url.searchParams.set('api_key', API_KEY);
  url.searchParams.set('external_source', 'imdb_id');

  const response = await fetch(url.toString());
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ status_message: 'Unknown error' }));
    throw new Error(`TMDb API error: ${error.status_message || response.statusText}`);
  }

  const data = await response.json();
  
  if (!data.movie_results || data.movie_results.length === 0) {
    throw new Error(`No movie found with IMDb ID: ${imdbId}`);
  }

  // Get full details for the found movie
  return getMovieDetails(data.movie_results[0].id);
}

/**
 * Get YouTube trailer URL for a movie
 */
export function getTrailerUrl(movie: TMDbMovie): string | null {
  if (!movie.videos?.results) return null;

  // Find official trailer
  const trailer = movie.videos.results.find(
    (video) =>
      video.site === 'YouTube' &&
      video.type === 'Trailer' &&
      video.official
  );

  // Fallback to any YouTube trailer
  const anyTrailer = movie.videos.results.find(
    (video) => video.site === 'YouTube' && video.type === 'Trailer'
  );

  const videoKey = trailer?.key || anyTrailer?.key;
  return videoKey ? `https://www.youtube.com/embed/${videoKey}` : null;
}

/**
 * Get director from movie credits
 */
export function getDirector(movie: TMDbMovie): string | null {
  if (!movie.credits?.crew) return null;

  const director = movie.credits.crew.find(
    (person) => person.job === 'Director'
  );

  return director?.name || null;
}

/**
 * Get main cast (first N actors)
 */
export function getMainCast(movie: TMDbMovie, limit: number = 5): string[] {
  if (!movie.credits?.cast) return [];

  return movie.credits.cast
    .slice(0, limit)
    .map((actor) => actor.name);
}

/**
 * Transform TMDb movie to Strapi movie format
 */
export function transformTMDbToStrapi(movie: TMDbMovie) {
  return {
    title: movie.title,
    year: movie.release_date ? new Date(movie.release_date).getFullYear() : null,
    director: getDirector(movie),
    genre: movie.genres.map((g) => g.name).join(', '),
    rating: Math.round(movie.vote_average * 10) / 10, // Convert to 1-10 scale
    poster: getTMDbImageUrl(movie.poster_path, 'poster', 'large'),
    tmdbId: movie.id.toString(),
    notes: movie.overview,
    tags: movie.genres.map((g) => g.name.toLowerCase()),
    favorite: false,
    watched: false,
  };
}
