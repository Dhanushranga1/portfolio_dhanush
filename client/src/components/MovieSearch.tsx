/**
 * Movie Search Component
 * 
 * Search for movies using TMDB API and add them to your Strapi collection.
 * This component demonstrates the integration between TMDB and Strapi.
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, Star, Calendar, Clock, Film, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import {
  searchMovies,
  getMovieDetails,
  getTMDBImageUrl,
  type TMDBMovie,
  type TMDBMovieDetails,
} from '@/lib/tmdb';
import { addMovieFromTMDB, getMovieByTmdbId } from '@/lib/strapiMovies';

export default function MovieSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<TMDBMovie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<TMDBMovieDetails | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [isAddingMovie, setIsAddingMovie] = useState(false);
  const [personalNotes, setPersonalNotes] = useState('');
  const [rating, setRating] = useState(0);
  const [favorite, setFavorite] = useState(false);
  const { toast } = useToast();

  // Search for movies
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    try {
      const results = await searchMovies(searchQuery);
      setSearchResults(results.results);
      if (results.results.length === 0) {
        toast({
          title: 'No results',
          description: 'No movies found matching your search.',
        });
      }
    } catch (error) {
      toast({
        title: 'Search failed',
        description: 'Failed to search movies. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSearching(false);
    }
  };

  // Load movie details
  const handleSelectMovie = async (movie: TMDBMovie) => {
    setIsLoadingDetails(true);
    try {
      const details = await getMovieDetails(movie.id);
      setSelectedMovie(details);
      
      // Check if movie already exists in Strapi
      const existingMovie = await getMovieByTmdbId(movie.id);
      if (existingMovie) {
        toast({
          title: 'Movie already in collection',
          description: `${movie.title} is already in your Strapi collection.`,
        });
      }
    } catch (error) {
      toast({
        title: 'Failed to load details',
        description: 'Could not load movie details.',
        variant: 'destructive',
      });
    } finally {
      setIsLoadingDetails(false);
    }
  };

  // Add movie to Strapi
  const handleAddMovie = async () => {
    if (!selectedMovie) return;

    setIsAddingMovie(true);
    try {
      await addMovieFromTMDB(selectedMovie, {
        personalNotes,
        rating: rating || selectedMovie.vote_average,
        favorite,
        watched: false,
      });

      toast({
        title: 'Movie added!',
        description: `${selectedMovie.title} has been added to your collection.`,
      });

      // Reset form
      setSelectedMovie(null);
      setPersonalNotes('');
      setRating(0);
      setFavorite(false);
      setSearchResults([]);
      setSearchQuery('');
    } catch (error) {
      toast({
        title: 'Failed to add movie',
        description: 'Could not add movie to Strapi. Check console for details.',
        variant: 'destructive',
      });
      console.error('Add movie error:', error);
    } finally {
      setIsAddingMovie(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <Card className="terminal-card p-6">
        <h2 className="text-xl font-semibold text-accent-info mb-4">
          <span className="text-accent-info/70">$</span> search-movie --tmdb
        </h2>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-terminal-text-dim" />
            <Input
              type="text"
              placeholder="Search for a movie..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="pl-10 bg-terminal-bg-alt border-terminal-border focus:border-accent-info/50 focus:ring-2 focus:ring-accent-info/20"
            />
          </div>
          <Button
            onClick={handleSearch}
            disabled={isSearching || !searchQuery.trim()}
            className="bg-accent-info text-surface hover:bg-accent-info/90"
          >
            {isSearching ? 'Searching...' : 'Search'}
          </Button>
        </div>
      </Card>

      {/* Search Results */}
      <AnimatePresence>
        {searchResults.length > 0 && !selectedMovie && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-accent-info">
              Found {searchResults.length} results
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {searchResults.slice(0, 10).map((movie) => (
                <motion.div
                  key={movie.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card
                    className="terminal-card cursor-pointer overflow-hidden hover:border-accent-info/50 transition-all duration-200"
                    onClick={() => handleSelectMovie(movie)}
                  >
                    <div className="aspect-[2/3] relative bg-gradient-to-b from-terminal-bg-alt/50 to-terminal-bg">
                      {movie.poster_path ? (
                        <img
                          src={getTMDBImageUrl(movie.poster_path, 'w342')!}
                          alt={movie.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Film className="h-12 w-12 text-terminal-text-dim" />
                        </div>
                      )}
                    </div>
                    <div className="p-3">
                      <h4 className="font-semibold text-sm text-accent-info line-clamp-2 mb-1">
                        {movie.title}
                      </h4>
                      <p className="text-xs text-terminal-text-dim">
                        {movie.release_date?.split('-')[0] || 'N/A'}
                      </p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Movie Details & Add Form */}
      <AnimatePresence>
        {selectedMovie && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className="terminal-card p-6 space-y-6">
              <div className="flex items-start justify-between">
                <h2 className="text-2xl font-bold text-accent-info">
                  Add to Collection
                </h2>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setSelectedMovie(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {/* Poster */}
                <div className="space-y-4">
                  <div className="aspect-[2/3] relative overflow-hidden rounded-lg bg-gradient-to-b from-terminal-bg-alt/50 to-terminal-bg border border-border/30">
                    {selectedMovie.poster_path ? (
                      <img
                        src={getTMDBImageUrl(selectedMovie.poster_path, 'w500')!}
                        alt={selectedMovie.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Film className="h-16 w-16 text-terminal-text-dim" />
                      </div>
                    )}
                  </div>

                  {/* Favorite Toggle */}
                  <Button
                    variant={favorite ? 'default' : 'outline'}
                    className="w-full"
                    onClick={() => setFavorite(!favorite)}
                  >
                    <Star
                      className={`h-4 w-4 mr-2 ${favorite ? 'fill-current' : ''}`}
                    />
                    {favorite ? 'Favorite' : 'Mark as Favorite'}
                  </Button>
                </div>

                {/* Details & Form */}
                <div className="md:col-span-2 space-y-4">
                  {/* Movie Info */}
                  <div>
                    <h3 className="text-xl font-bold text-accent-info mb-2">
                      {selectedMovie.title}
                    </h3>
                    {selectedMovie.tagline && (
                      <p className="text-sm text-terminal-text-dim/80 italic mb-3">
                        "{selectedMovie.tagline}"
                      </p>
                    )}

                    <div className="flex flex-wrap gap-3 text-sm text-terminal-text-dim mb-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {selectedMovie.release_date?.split('-')[0] || 'N/A'}
                      </span>
                      {selectedMovie.runtime && (
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {selectedMovie.runtime} min
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Star className="h-3.5 w-3.5 fill-terminal-accent-yellow text-terminal-accent-yellow" />
                        {selectedMovie.vote_average.toFixed(1)}/10
                      </span>
                    </div>

                    {/* Genres */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {selectedMovie.genres.map((genre) => (
                        <Badge
                          key={genre.id}
                          className="bg-[#064E3B] text-[#10B981] border-[#10B981]/30"
                        >
                          {genre.name}
                        </Badge>
                      ))}
                    </div>

                    <p className="text-sm text-terminal-text-dim/90 leading-relaxed">
                      {selectedMovie.overview}
                    </p>
                  </div>

                  {/* Rating */}
                  <div>
                    <label className="block text-sm font-medium text-accent-info mb-2">
                      Your Rating (0-10)
                    </label>
                    <div className="flex gap-1">
                      {Array.from({ length: 10 }).map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setRating(i + 1)}
                          className="p-1 hover:scale-110 transition-transform"
                          aria-label={`Rate ${i + 1} stars`}
                          title={`Rate ${i + 1} stars`}
                        >
                          <Star
                            className={`h-5 w-5 ${
                              i < rating
                                ? 'fill-terminal-accent-yellow text-terminal-accent-yellow'
                                : 'text-terminal-text-dim'
                            }`}
                          />
                        </button>
                      ))}
                      <span className="ml-2 text-sm font-mono font-medium text-[#10B981]">
                        {rating || selectedMovie.vote_average.toFixed(1)}/10
                      </span>
                    </div>
                  </div>

                  {/* Personal Notes */}
                  <div>
                    <label className="block text-sm font-medium text-accent-info mb-2">
                      Personal Notes (optional)
                    </label>
                    <Textarea
                      placeholder="Add your thoughts about this movie..."
                      value={personalNotes}
                      onChange={(e) => setPersonalNotes(e.target.value)}
                      className="min-h-[100px] bg-terminal-bg-alt border-terminal-border"
                    />
                  </div>

                  {/* Add Button */}
                  <div className="flex gap-2 pt-4 border-t border-border/30">
                    <Button
                      className="flex-1 bg-accent-info text-surface hover:bg-accent-info/90"
                      onClick={handleAddMovie}
                      disabled={isAddingMovie}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      {isAddingMovie ? 'Adding...' : 'Add to Collection'}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setSelectedMovie(null)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading State */}
      {isLoadingDetails && (
        <Card className="terminal-card p-12 text-center">
          <p className="text-terminal-text-dim">Loading movie details...</p>
        </Card>
      )}
    </div>
  );
}
