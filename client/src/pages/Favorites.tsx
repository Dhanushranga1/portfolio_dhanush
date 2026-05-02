import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Search, Star, Calendar, Download, Grid3x3, List, 
  Play, Edit, X, Check, Filter, ArrowUpDown 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

// For production, replace with: import { useMovies, useAddMovie } from "@/hooks/useStrapi";
// For now, we'll use mock data since Strapi isn't set up yet

type Movie = {
  id: string;
  title: string;
  year: number;
  director: string | null;
  genre: string;
  rating: number; // 1-10 scale
  watched: boolean;
  watchedDate: string | null;
  poster: string | null;
  tmdbId: string | null;
  notes: string;
  tags: string[];
  favorite: boolean;
  trailer: string | null;
  addedAt: string;
};

// Mock data matching the research spec format
const MOCK_MOVIES: Movie[] = [
  {
    id: "1",
    title: "The Matrix",
    year: 1999,
    director: "Wachowskis",
    genre: "Sci-Fi, Action",
    rating: 10,
    watched: true,
    watchedDate: "2024-01-01",
    poster: "https://image.tmdb.org/t/p/w500/f89J6sVrpETYoGk2xfB9g6mEGYb.jpg",
    tmdbId: "603",
    notes: "A foundational film. *Mind-bending* cyberpunk masterpiece.",
    tags: ["sci-fi", "action", "mind-bending"],
    favorite: true,
    trailer: "https://www.youtube.com/embed/vKQi3bBA1y8",
    addedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "2",
    title: "Star Wars: Ep. V",
    year: 1980,
    director: "Irvin Kershner",
    genre: "Sci-Fi, Adventure",
    rating: 9,
    watched: true,
    watchedDate: "2024-02-15",
    poster: "https://image.tmdb.org/t/p/w500/7BuH8S4Y02wYn5e0rsx0xKkH0b.jpg",
    tmdbId: "1891",
    notes: "Best of the original trilogy",
    tags: ["sci-fi", "classic", "space-opera"],
    favorite: true,
    trailer: "https://www.youtube.com/embed/JNwNXF9Y6kY",
    addedAt: "2024-02-01T00:00:00Z",
  },
  {
    id: "3",
    title: "Pulp Fiction",
    year: 1994,
    director: "Quentin Tarantino",
    genre: "Crime, Drama",
    rating: 9,
    watched: true,
    watchedDate: "2024-03-10",
    poster: "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
    tmdbId: "680",
    notes: "Non-linear storytelling perfection",
    tags: ["crime", "classic", "dialogue-heavy"],
    favorite: false,
    trailer: "https://www.youtube.com/embed/s7EdQ4FqbhY",
    addedAt: "2024-03-01T00:00:00Z",
  },
  {
    id: "4",
    title: "Inception",
    year: 2010,
    director: "Christopher Nolan",
    genre: "Sci-Fi, Action, Thriller",
    rating: 8,
    watched: true,
    watchedDate: "2024-04-05",
    poster: "https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
    tmdbId: "27205",
    notes: "Dreams within dreams",
    tags: ["sci-fi", "action", "mind-bending"],
    favorite: false,
    trailer: "https://www.youtube.com/embed/YoHD9XEInc0",
    addedAt: "2024-04-01T00:00:00Z",
  },
];

type ViewMode = "grid" | "list";
type SortMode = "manual" | "rating" | "year" | "alphabetical";

export default function Favorites() {
  const [movies, setMovies] = useState<Movie[]>(MOCK_MOVIES);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [sortMode, setSortMode] = useState<SortMode>("manual");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterTag, setFilterTag] = useState<string | null>(null);
  const [filterFavorite, setFilterFavorite] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [editingNotes, setEditingNotes] = useState<string | null>(null);
  const [noteText, setNoteText] = useState("");
  
  const trailerDialog = useRef<HTMLDialogElement>(null);
  const { toast } = useToast();

  // Get unique tags from all movies
  const allTags = Array.from(
    new Set(movies.flatMap((m) => m.tags))
  ).sort();

  // Filter and sort movies
  const filteredMovies = movies
    .filter((movie) => {
      const matchesSearch =
        searchQuery === "" ||
        movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.director?.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesTag = !filterTag || movie.tags.includes(filterTag);
      const matchesFavorite = !filterFavorite || movie.favorite;

      return matchesSearch && matchesTag && matchesFavorite;
    })
    .sort((a, b) => {
      switch (sortMode) {
        case "rating":
          return b.rating - a.rating;
        case "year":
          return b.year - a.year;
        case "alphabetical":
          return a.title.localeCompare(b.title);
        case "manual":
        default:
          return new Date(a.addedAt).getTime() - new Date(b.addedAt).getTime();
      }
    });

  // Export to JSON (client-side download using data: URI)
  const exportToJson = () => {
    const dataStr = JSON.stringify(movies, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
    const link = document.createElement("a");
    link.setAttribute("href", dataUri);
    link.setAttribute("download", `favorites_movies_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Exported successfully",
      description: `Exported ${movies.length} movies to JSON`,
    });
  };

  // Open trailer in native <dialog>
  const openTrailer = (movie: Movie) => {
    if (!movie.trailer) {
      toast({
        title: "No trailer available",
        description: `Trailer not found for ${movie.title}`,
        variant: "destructive",
      });
      return;
    }
    setSelectedMovie(movie);
    trailerDialog.current?.showModal();
  };

  const closeTrailer = () => {
    trailerDialog.current?.close();
    setSelectedMovie(null);
  };

  // Toggle favorite
  const toggleFavorite = (movieId: string) => {
    setMovies((prev) =>
      prev.map((m) =>
        m.id === movieId ? { ...m, favorite: !m.favorite } : m
      )
    );
  };

  // Edit notes
  const startEditingNotes = (movie: Movie) => {
    setEditingNotes(movie.id);
    setNoteText(movie.notes);
  };

  const saveNotes = (movieId: string) => {
    setMovies((prev) =>
      prev.map((m) => (m.id === movieId ? { ...m, notes: noteText } : m))
    );
    setEditingNotes(null);
    toast({
      title: "Notes saved",
      description: "Movie notes updated successfully",
    });
  };

  // Rate movie
  const rateMovie = (movieId: string, rating: number) => {
    setMovies((prev) =>
      prev.map((m) => (m.id === movieId ? { ...m, rating } : m))
    );
  };

  // Toggle watched
  const toggleWatched = (movieId: string) => {
    setMovies((prev) =>
      prev.map((m) =>
        m.id === movieId
          ? {
              ...m,
              watched: !m.watched,
              watchedDate: !m.watched ? new Date().toISOString() : null,
            }
          : m
      )
    );
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle shortcuts when not typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      // Toggle view mode: 'v' or 'V'
      if (e.key === "v" || e.key === "V") {
        e.preventDefault();
        setViewMode((prev) => (prev === "grid" ? "list" : "grid"));
        toast({
          title: `Switched to ${viewMode === "grid" ? "list" : "grid"} view`,
          description: `Press 'V' to toggle back`,
        });
      }

      // Export: Ctrl/Cmd + E
      if (e.key === "e" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        exportToJson();
      }

      // Escape to close trailer
      if (e.key === "Escape" && trailerDialog.current?.open) {
        closeTrailer();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [viewMode]); // Added viewMode to dependencies for toast message

  // JSON-LD structured data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Favorite Movies Collection",
    "description": "Curated list of favorite movies",
    "numberOfItems": movies.length,
    "itemListElement": movies.map((movie, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Movie",
        "name": movie.title,
        "dateCreated": movie.year.toString(),
        "director": movie.director ? {
          "@type": "Person",
          "name": movie.director
        } : undefined,
        "genre": movie.genre.split(",").map(g => g.trim()),
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": movie.rating,
          "bestRating": 10,
          "worstRating": 1
        }
      }
    }))
  };

  return (
    <>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="min-h-screen bg-background text-foreground pt-24 pb-20 px-6 font-mono">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-6 flex-wrap gap-4"
        >
          <div>
            <h1 className="text-3xl md:text-[1.4rem] md:text-4xl font-bold text-accent-info mb-2 tracking-wide">
              <span className="text-accent-info/70">$</span> ls ~/favorites/movies<span className="terminal-prompt"></span>
            </h1>
            <p className="text-muted-foreground text-sm md:text-base" style={{ lineHeight: '1.6' }}>
              <span className="text-accent-info/80 font-medium">{filteredMovies.length}</span> of {movies.length} movies indexed
              <span className="ml-2 text-accent-info/50">•</span>
              <span className="ml-2">Press <kbd className="px-1.5 py-0.5 bg-surface-2 border border-border/50 rounded text-xs font-semibold">V</kbd> to toggle view</span>
            </p>
          </div>
          
          {/* View Toggle */}
          <div className="flex gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("grid")}
              className={`font-mono ${viewMode === "grid" ? "bg-accent-info text-surface" : "hover:bg-surface-2"}`}
              aria-label="Grid view (press V to toggle)"
              title="Grid view"
            >
              <Grid3x3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("list")}
              className={`font-mono ${viewMode === "list" ? "bg-accent-info text-surface" : "hover:bg-surface-2"}`}
              aria-label="List view (press V to toggle)"
              title="List view"
            >
              <List className="h-4 w-4" />
            </Button>
            
            {/* Export Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={exportToJson}
              className="font-mono hover:bg-surface-2 ml-2"
              aria-label="Export to JSON (Ctrl/Cmd+E)"
              title="Export to JSON"
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </motion.div>

        {/* Controls Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="terminal-card p-5 space-y-4 border-l-2 border-l-transparent hover:border-l-accent-info/30 transition-all duration-300"
        >
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-terminal-text-dim" />
            <Input
              type="text"
              placeholder="Search by title or director..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-terminal-bg-alt border-terminal-border focus:border-accent-info/50 focus:ring-2 focus:ring-accent-info/20 transition-all duration-200"
            />
          </div>

          {/* Filters and Sort */}
          <div className="flex flex-wrap gap-3 items-center pt-2 border-t border-border/30">
            {/* Sort */}
            <div className="flex items-center gap-2">
              <ArrowUpDown className="h-4 w-4 text-terminal-text-dim" />
              <Select value={sortMode} onValueChange={(v) => setSortMode(v as SortMode)}>
                <SelectTrigger className="w-[180px] bg-terminal-bg-alt border-terminal-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="manual">Manual Order</SelectItem>
                  <SelectItem value="rating">Rating (High-Low)</SelectItem>
                  <SelectItem value="year">Year (Recent)</SelectItem>
                  <SelectItem value="alphabetical">A-Z</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Filter by Tag */}
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-terminal-text-dim" />
              <Select 
                value={filterTag || "all"} 
                onValueChange={(v) => setFilterTag(v === "all" ? null : v)}
              >
                <SelectTrigger className="w-[180px] bg-terminal-bg-alt border-terminal-border">
                  <SelectValue placeholder="Filter by tag" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tags</SelectItem>
                  {allTags.map((tag) => (
                    <SelectItem key={tag} value={tag}>
                      {tag}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Favorite Filter */}
            <Button
              variant={filterFavorite ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterFavorite(!filterFavorite)}
              className={filterFavorite ? "bg-terminal-accent-yellow" : ""}
            >
              <Star className={`h-4 w-4 mr-2 ${filterFavorite ? "fill-current" : ""}`} />
              Favorites Only
            </Button>

            {/* Export */}
            <Button
              variant="outline"
              size="sm"
              onClick={exportToJson}
              className="ml-auto hover:bg-accent-info/10 hover:border-accent-info/50 hover:text-accent-info transition-all duration-200"
            >
              <Download className="h-4 w-4 mr-2" />
              Export JSON
            </Button>
          </div>

          {/* Active Filters */}
          {(searchQuery || filterTag || filterFavorite) && (
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-sm text-terminal-text-dim">Active filters:</span>
              {searchQuery && (
                <Badge variant="secondary" className="gap-1">
                  Search: {searchQuery}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => setSearchQuery("")}
                  />
                </Badge>
              )}
              {filterTag && (
                <Badge variant="secondary" className="gap-1">
                  Tag: {filterTag}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => setFilterTag(null)}
                  />
                </Badge>
              )}
              {filterFavorite && (
                <Badge variant="secondary" className="gap-1">
                  Favorites
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => setFilterFavorite(false)}
                  />
                </Badge>
              )}
            </div>
          )}
        </motion.div>

        {/* Keyboard Hints */}
        <div className="mt-4 text-sm text-terminal-text-dim">
          <span className="mr-4">Press <kbd className="px-2 py-1 bg-terminal-bg-alt rounded border border-terminal-border">v</kbd> to toggle view</span>
          <span>Press <kbd className="px-2 py-1 bg-terminal-bg-alt rounded border border-terminal-border">Ctrl+E</kbd> to export</span>
        </div>
      </div>

      {/* Movies Display */}
      <div className="max-w-7xl mx-auto">
        {filteredMovies.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="terminal-card p-12 text-center"
          >
            <p className="text-terminal-text-dim text-lg">No movies found matching your criteria</p>
          </motion.div>
        ) : viewMode === "grid" ? (
          /* Grid View */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 transition-all duration-300">
            {filteredMovies.map((movie, idx) => (
              <motion.div
                key={movie.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: Math.min(idx * 0.05, 0.8) }}
              >
                <Card className="terminal-card overflow-hidden group hover:border-accent-info/50 hover:bg-surface-2/30 hover:-translate-y-1 hover:shadow-[0_0_12px_rgba(54,224,199,0.15)] transition-all duration-200 rounded-[14px] h-full">
              
                  {/* Poster */}
                  <div className="relative aspect-[2/3] overflow-hidden bg-gradient-to-b from-terminal-bg-alt/50 to-terminal-bg">
                    {movie.poster ? (
                      <img
                        src={movie.poster}
                        alt={movie.title}
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-terminal-text-dim">
                        No poster
                      </div>
                    )}
                    
                    {/* Favorite Star Overlay */}
                    <button
                      onClick={() => toggleFavorite(movie.id)}
                      className="absolute top-2 right-2 p-2 bg-terminal-bg/90 backdrop-blur-sm rounded-full hover:bg-accent-info/20 hover:text-accent-info transition-all duration-200"
                      aria-label={movie.favorite ? "Remove from favorites" : "Add to favorites"}
                    >
                      <Star
                        className={`h-5 w-5 transition-colors ${
                          movie.favorite
                            ? "fill-terminal-accent-yellow text-terminal-accent-yellow"
                            : "text-terminal-text-dim"
                        }`}
                      />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="p-4 space-y-3">
                    <div>
                      <h3 className="text-lg font-semibold text-accent-info mb-1 line-clamp-1 group-hover:text-accent-info/80 transition-colors">
                        {movie.title}
                      </h3>
                      <p className="text-sm text-terminal-text-dim/90" style={{ lineHeight: '1.5' }}>
                        {movie.year} • {movie.director || "Unknown"}
                      </p>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2">
                      <div className="flex gap-0.5">
                        {Array.from({ length: 10 }).map((_, i) => (
                          <button
                            key={i}
                            onClick={() => rateMovie(movie.id, i + 1)}
                            className="p-0 hover:scale-110 transition-transform"
                            aria-label={`Rate ${i + 1} stars`}
                          >
                            <Star
                              className={`h-3 w-3 transition-colors ${
                                i < movie.rating
                                  ? "fill-terminal-accent-yellow text-terminal-accent-yellow"
                                  : "text-terminal-text-dim hover:text-terminal-accent-yellow/50"
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                      <span className="text-sm font-mono font-medium text-[#10B981]">
                        {movie.rating}/10
                      </span>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {movie.tags.slice(0, 3).map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs bg-[#064E3B] text-[#10B981] border-[#10B981]/30 hover:border-[#10B981]/50 transition-colors"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-3 border-t border-border/30">
                    {movie.trailer && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openTrailer(movie)}
                        className="flex-1 hover:bg-accent-info/10 hover:border-accent-info/50 hover:text-accent-info transition-all duration-200"
                      >
                        <Play className="h-3 w-3 mr-1" />
                        Trailer
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => startEditingNotes(movie)}
                      className="flex-1 hover:bg-accent-info/10 hover:border-accent-info/50 hover:text-accent-info transition-all duration-200"
                    >
                      <Edit className="h-3 w-3 mr-1" />
                      Notes
                    </Button>
                  </div>

                  {/* Notes (if editing) */}
                  {editingNotes === movie.id && (
                    <div className="space-y-2 pt-2 border-t border-terminal-border">
                      <Textarea
                        value={noteText}
                        onChange={(e) => setNoteText(e.target.value)}
                        placeholder="Add your notes... (Markdown supported)"
                        className="min-h-[80px] text-sm bg-terminal-bg-alt"
                      />
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => saveNotes(movie.id)}
                          className="flex-1"
                        >
                          <Check className="h-3 w-3 mr-1" />
                          Save
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingNotes(null)}
                          className="flex-1"
                        >
                          <X className="h-3 w-3 mr-1" />
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Show notes preview if not editing */}
                  {editingNotes !== movie.id && movie.notes && (
                    <p className="text-sm text-terminal-text-dim/90 line-clamp-2 pt-3 border-t border-border/30" style={{ lineHeight: '1.6' }}>
                      {movie.notes}
                    </p>
                  )}
                </div>
              </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          /* List View */
          <div className="space-y-4">
            {filteredMovies.map((movie, idx) => (
              <motion.div
                key={movie.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: Math.min(idx * 0.05, 0.6) }}
              >
                <Card className="terminal-card p-4 hover:border-l-4 hover:border-l-accent-info hover:border-accent-info/50 hover:bg-surface-2/30 transition-all duration-200">
              
                <div className="flex gap-4">
                  {/* Poster Thumbnail */}
                  <div className="w-16 h-24 flex-shrink-0 bg-terminal-bg-alt rounded overflow-hidden">
                    {movie.poster ? (
                      <img
                        src={movie.poster}
                        alt={movie.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-terminal-text-dim">
                        No poster
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-bold text-terminal-accent-blue">
                          {movie.title} <span className="text-terminal-text-dim font-normal">({movie.year})</span>
                        </h3>
                        <p className="text-sm text-terminal-text-dim">
                          {movie.director && `Directed by ${movie.director} • `}
                          {movie.genre}
                        </p>
                      </div>

                      {/* Rating */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-terminal-accent-yellow font-bold">{movie.rating}/10</span>
                        <button
                          onClick={() => toggleFavorite(movie.id)}
                          aria-label={movie.favorite ? "Remove from favorites" : "Add to favorites"}
                        >
                          <Star
                            className={`h-5 w-5 ${
                              movie.favorite
                                ? "fill-terminal-accent-yellow text-terminal-accent-yellow"
                                : "text-terminal-text-dim"
                            }`}
                          />
                        </button>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {movie.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs bg-[#064E3B] text-[#10B981] border-[#10B981]/30">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Notes Preview */}
                    {movie.notes && (
                      <p className="text-sm text-terminal-text-dim/90 mb-3 line-clamp-2" style={{ lineHeight: '1.6' }}>
                        {movie.notes}
                      </p>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2">
                      {movie.trailer && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openTrailer(movie)}
                          className="hover:bg-accent-info/10 hover:border-accent-info/50 hover:text-accent-info transition-all duration-200"
                        >
                          <Play className="h-3 w-3 mr-1" />
                          Trailer
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => startEditingNotes(movie)}
                        className="hover:bg-accent-info/10 hover:border-accent-info/50 hover:text-accent-info transition-all duration-200"
                      >
                        <Edit className="h-3 w-3 mr-1" />
                        Edit Notes
                      </Button>
                      <Button
                        size="sm"
                        variant={movie.watched ? "default" : "outline"}
                        onClick={() => toggleWatched(movie.id)}
                        className={movie.watched ? "bg-[#10B981] hover:bg-[#10B981]/90" : "hover:bg-accent-info/10 hover:border-accent-info/50"}
                      >
                        <Check className="h-3 w-3 mr-1" />
                        {movie.watched ? "Watched" : "Mark Watched"}
                      </Button>
                      {movie.watched && movie.watchedDate && (
                        <span className="text-xs text-terminal-text-dim/80 flex items-center ml-auto">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(movie.watchedDate).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Native <dialog> Modal for Trailer */}
      <dialog
        ref={trailerDialog}
        className="backdrop:bg-black/80 bg-terminal-bg border border-terminal-border rounded-lg p-0 max-w-4xl w-full"
        onClick={(e) => {
          // Close on backdrop click
          if (e.target === trailerDialog.current) {
            closeTrailer();
          }
        }}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            closeTrailer();
          }
        }}
      >
        {selectedMovie && (
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <h2 id="dialog-title" className="text-xl font-bold text-terminal-accent-blue">
                {selectedMovie.title} - Trailer
              </h2>
              <button
                onClick={closeTrailer}
                className="text-terminal-text-dim hover:text-terminal-text"
                aria-label="Close"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {selectedMovie.trailer && (
              <div className="aspect-video w-full">
                <iframe
                  width="100%"
                  height="100%"
                  src={selectedMovie.trailer}
                  title={`Trailer for ${selectedMovie.title}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded"
                />
              </div>
            )}

            <div className="mt-4 flex justify-end">
              <Button onClick={closeTrailer} autoFocus>
                Close
              </Button>
            </div>
          </div>
        )}
      </dialog>
    </div>
    </>
  );
}
