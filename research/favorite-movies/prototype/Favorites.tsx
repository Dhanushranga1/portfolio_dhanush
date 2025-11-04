import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LayoutGrid, List, Download, Play, Star, MapPin, Calendar, Search, X } from "lucide-react";
import mockData from "./mock-data.json";

type Movie = {
  id: number;
  title: string;
  year: number;
  rating: number;
  genre: string[];
  director: string;
  poster: string;
  trailer: string;
  watchlist: boolean;
  notes: string;
  dateAdded: string;
};

type Photo = {
  id: number;
  title: string;
  location: string;
  date: string;
  url: string;
  thumbnail: string;
  tags: string[];
  description: string;
};

export default function Favorites() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [movies, setMovies] = useState<Movie[]>(mockData.movies);
  const [photos] = useState<Photo[]>(mockData.photos);
  const [sortBy, setSortBy] = useState<"rating" | "title" | "year" | "dateAdded">("rating");
  const [filterGenre, setFilterGenre] = useState<string>("all");
  const [filterTag, setFilterTag] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  // Get unique genres and tags
  const allGenres = ["all", ...Array.from(new Set(movies.flatMap((m) => m.genre)))];
  const allTags = ["all", ...Array.from(new Set(photos.flatMap((p) => p.tags)))];

  // Filter and sort movies
  const filteredMovies = movies
    .filter((movie) => {
      const matchesGenre = filterGenre === "all" || movie.genre.includes(filterGenre);
      const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           movie.director.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesGenre && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "year") return b.year - a.year;
      if (sortBy === "title") return a.title.localeCompare(b.title);
      if (sortBy === "dateAdded") return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
      return 0;
    });

  // Filter photos
  const filteredPhotos = photos.filter((photo) => {
    const matchesTag = filterTag === "all" || photo.tags.includes(filterTag);
    const matchesSearch = photo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         photo.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTag && matchesSearch;
  });

  // Export JSON
  const handleExport = (type: "movies" | "photos") => {
    const data = type === "movies" ? filteredMovies : filteredPhotos;
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `favorites-${type}-${new Date().toISOString().split("T")[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && (selectedMovie || selectedPhoto)) {
        setSelectedMovie(null);
        setSelectedPhoto(null);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selectedMovie, selectedPhoto]);

  return (
    <div className="min-h-screen bg-terminal-bg text-terminal-text font-mono p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-terminal-accent-info mb-2">
            <span className="text-terminal-muted">$</span> cat ./favorites.json
          </h1>
          <p className="text-terminal-muted">
            # Personal collection of movies and photos I love
          </p>
        </header>

        {/* Tabs */}
        <Tabs defaultValue="movies" className="w-full">
          <TabsList className="bg-terminal-bg border border-terminal-muted mb-6">
            <TabsTrigger value="movies" className="data-[state=active]:bg-terminal-accent-info/20">
              🎬 Movies ({movies.length})
            </TabsTrigger>
            <TabsTrigger value="photos" className="data-[state=active]:bg-terminal-accent-info/20">
              📸 Photos ({photos.length})
            </TabsTrigger>
          </TabsList>

          {/* Movies Tab */}
          <TabsContent value="movies" className="space-y-6">
            {/* Controls */}
            <div className="flex flex-wrap gap-4 items-center justify-between">
              <div className="flex gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  aria-label="Grid view"
                >
                  <LayoutGrid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  aria-label="List view"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex gap-2 flex-wrap items-center">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-terminal-muted" />
                  <Input
                    placeholder="Search movies..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8 w-64"
                  />
                </div>

                <Select value={sortBy} onValueChange={(v: any) => setSortBy(v)}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">Rating</SelectItem>
                    <SelectItem value="title">Title</SelectItem>
                    <SelectItem value="year">Year</SelectItem>
                    <SelectItem value="dateAdded">Date Added</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filterGenre} onValueChange={setFilterGenre}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Filter genre" />
                  </SelectTrigger>
                  <SelectContent>
                    {allGenres.map((genre) => (
                      <SelectItem key={genre} value={genre}>
                        {genre === "all" ? "All Genres" : genre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleExport("movies")}
                  aria-label="Export movies as JSON"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>

            {/* Movies Grid/List */}
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                  : "space-y-4"
              }
              role="list"
              aria-label="Movies list"
            >
              {filteredMovies.map((movie) => (
                <article
                  key={movie.id}
                  className={`border border-terminal-muted rounded-lg overflow-hidden hover:border-terminal-accent-info transition-colors ${
                    viewMode === "list" ? "flex gap-4" : ""
                  }`}
                  role="listitem"
                >
                  <img
                    src={movie.poster}
                    alt={`${movie.title} poster`}
                    loading="lazy"
                    className={`object-cover ${
                      viewMode === "grid" ? "w-full h-64" : "w-32 h-48"
                    }`}
                  />
                  <div className="p-4 flex-1">
                    <h3 className="text-lg font-bold text-terminal-accent-info mb-1">
                      {movie.title}
                    </h3>
                    <p className="text-sm text-terminal-muted mb-2">
                      {movie.year} • {movie.director}
                    </p>
                    <div className="flex items-center gap-2 mb-3">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-bold">{movie.rating}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {movie.genre.map((g) => (
                        <Badge key={g} variant="secondary" className="text-xs">
                          {g}
                        </Badge>
                      ))}
                    </div>
                    {movie.notes && (
                      <p className="text-xs text-terminal-muted mb-3 italic">
                        "{movie.notes}"
                      </p>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSelectedMovie(movie)}
                      className="w-full"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Watch Trailer
                    </Button>
                  </div>
                </article>
              ))}
            </div>

            {filteredMovies.length === 0 && (
              <div className="text-center py-12 text-terminal-muted">
                <p>No movies found matching your filters.</p>
              </div>
            )}
          </TabsContent>

          {/* Photos Tab */}
          <TabsContent value="photos" className="space-y-6">
            {/* Controls */}
            <div className="flex flex-wrap gap-4 items-center justify-between">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-terminal-muted" />
                <Input
                  placeholder="Search photos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 w-64"
                />
              </div>

              <div className="flex gap-2">
                <Select value={filterTag} onValueChange={setFilterTag}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Filter tag" />
                  </SelectTrigger>
                  <SelectContent>
                    {allTags.map((tag) => (
                      <SelectItem key={tag} value={tag}>
                        {tag === "all" ? "All Tags" : tag}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleExport("photos")}
                  aria-label="Export photos as JSON"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>

            {/* Photos Grid */}
            <div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
              role="list"
              aria-label="Photos list"
            >
              {filteredPhotos.map((photo) => (
                <article
                  key={photo.id}
                  className="border border-terminal-muted rounded-lg overflow-hidden hover:border-terminal-accent-info transition-colors cursor-pointer"
                  onClick={() => setSelectedPhoto(photo)}
                  role="listitem"
                >
                  <img
                    src={photo.thumbnail}
                    alt={photo.title}
                    loading="lazy"
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-terminal-accent-info mb-2">
                      {photo.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-terminal-muted mb-2">
                      <MapPin className="w-4 h-4" />
                      <span>{photo.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-terminal-muted mb-3">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(photo.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {photo.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {filteredPhotos.length === 0 && (
              <div className="text-center py-12 text-terminal-muted">
                <p>No photos found matching your filters.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Movie Trailer Modal */}
        {selectedMovie && (
          <dialog
            open
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
            onClick={() => setSelectedMovie(null)}
          >
            <div
              className="bg-terminal-bg border-2 border-terminal-accent-info rounded-lg max-w-4xl w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-terminal-accent-info">
                  {selectedMovie.title} ({selectedMovie.year})
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedMovie(null)}
                  aria-label="Close trailer"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
              <div className="aspect-video">
                <iframe
                  src={selectedMovie.trailer}
                  title={`${selectedMovie.title} trailer`}
                  className="w-full h-full rounded"
                  allowFullScreen
                />
              </div>
              <p className="text-sm text-terminal-muted mt-4">
                Press <kbd className="px-2 py-1 bg-terminal-muted/20 rounded">Esc</kbd> to close
              </p>
            </div>
          </dialog>
        )}

        {/* Photo Lightbox */}
        {selectedPhoto && (
          <dialog
            open
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            <div
              className="bg-terminal-bg border-2 border-terminal-accent-info rounded-lg max-w-6xl w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-terminal-accent-info mb-2">
                    {selectedPhoto.title}
                  </h2>
                  <div className="flex items-center gap-4 text-sm text-terminal-muted">
                    <span>📍 {selectedPhoto.location}</span>
                    <span>📅 {new Date(selectedPhoto.date).toLocaleDateString()}</span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedPhoto(null)}
                  aria-label="Close photo"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.title}
                className="w-full h-auto max-h-[70vh] object-contain rounded mb-4"
              />
              <p className="text-terminal-text mb-4">{selectedPhoto.description}</p>
              <div className="flex flex-wrap gap-2">
                {selectedPhoto.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
              <p className="text-sm text-terminal-muted mt-4">
                Press <kbd className="px-2 py-1 bg-terminal-muted/20 rounded">Esc</kbd> to close
              </p>
            </div>
          </dialog>
        )}
      </div>
    </div>
  );
}
