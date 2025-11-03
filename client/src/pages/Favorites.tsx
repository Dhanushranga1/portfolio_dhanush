import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LayoutGrid, List, Download, Play, Star, MapPin, Calendar, Search, X } from "lucide-react";

// Import existing photos
import photo1 from '@assets/generated_images/Nature_photo_one_c2ff85be.png';
import photo2 from '@assets/generated_images/Architecture_photo_617368a3.png';
import photo3 from '@assets/generated_images/Abstract_tech_visual_1ab6a0b2.png';

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

// Mock movie data - replace with your actual favorites
const mockMovies: Movie[] = [
  {
    id: 1,
    title: "The Shawshank Redemption",
    year: 1994,
    rating: 9.3,
    genre: ["Drama", "Crime"],
    director: "Frank Darabont",
    poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=300&h=450&fit=crop",
    trailer: "https://www.youtube.com/embed/6hB3S9bIaco",
    watchlist: true,
    notes: "All-time favorite. The ending is perfect.",
    dateAdded: "2024-01-15"
  },
  {
    id: 2,
    title: "Inception",
    year: 2010,
    rating: 8.8,
    genre: ["Sci-Fi", "Thriller", "Action"],
    director: "Christopher Nolan",
    poster: "https://images.unsplash.com/photo-1594908900066-3f47337549d8?w=300&h=450&fit=crop",
    trailer: "https://www.youtube.com/embed/YoHD9XEInc0",
    watchlist: false,
    notes: "Mind-bending masterpiece",
    dateAdded: "2024-02-20"
  },
  {
    id: 3,
    title: "The Dark Knight",
    year: 2008,
    rating: 9.0,
    genre: ["Action", "Crime", "Drama"],
    director: "Christopher Nolan",
    poster: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=300&h=450&fit=crop",
    trailer: "https://www.youtube.com/embed/EXeTwQWrcwY",
    watchlist: false,
    notes: "Ledger's performance is unforgettable",
    dateAdded: "2024-01-10"
  },
  {
    id: 4,
    title: "Pulp Fiction",
    year: 1994,
    rating: 8.9,
    genre: ["Crime", "Drama"],
    director: "Quentin Tarantino",
    poster: "https://images.unsplash.com/photo-1574267432644-f610f5c0d258?w=300&h=450&fit=crop",
    trailer: "https://www.youtube.com/embed/s7EdQ4FqbhY",
    watchlist: true,
    notes: "Non-linear storytelling at its best",
    dateAdded: "2024-03-05"
  },
  {
    id: 5,
    title: "Interstellar",
    year: 2014,
    rating: 8.7,
    genre: ["Sci-Fi", "Drama", "Adventure"],
    director: "Christopher Nolan",
    poster: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=300&h=450&fit=crop",
    trailer: "https://www.youtube.com/embed/zSWdZVtXT7E",
    watchlist: false,
    notes: "Beautiful score, emotional journey",
    dateAdded: "2024-02-28"
  },
  {
    id: 6,
    title: "The Matrix",
    year: 1999,
    rating: 8.7,
    genre: ["Sci-Fi", "Action"],
    director: "Wachowskis",
    poster: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=300&h=450&fit=crop",
    trailer: "https://www.youtube.com/embed/vKQi3bBA1y8",
    watchlist: true,
    notes: "Revolutionary action sequences",
    dateAdded: "2024-01-25"
  },
  {
    id: 7,
    title: "Parasite",
    year: 2019,
    rating: 8.5,
    genre: ["Drama", "Thriller"],
    director: "Bong Joon-ho",
    poster: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=300&h=450&fit=crop",
    trailer: "https://www.youtube.com/embed/5xH0HfJHsaY",
    watchlist: false,
    notes: "Genre-bending Korean masterpiece",
    dateAdded: "2024-03-10"
  },
  {
    id: 8,
    title: "Dune",
    year: 2021,
    rating: 8.1,
    genre: ["Sci-Fi", "Adventure", "Drama"],
    director: "Denis Villeneuve",
    poster: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=300&h=450&fit=crop",
    trailer: "https://www.youtube.com/embed/8g18jFHCLXk",
    watchlist: true,
    notes: "Stunning visuals and sound design",
    dateAdded: "2024-04-01"
  }
];

// Use existing photos and convert to new format
const mockPhotos: Photo[] = [
  {
    id: 1,
    title: "Nature Landscape",
    location: "Mountain Valley",
    date: "2024-06-15",
    url: photo1,
    thumbnail: photo1,
    tags: ["Nature", "Landscape"],
    description: "sunset landscape shot on pixel 8"
  },
  {
    id: 2,
    title: "Modern Architecture",
    location: "City Center",
    date: "2024-05-20",
    url: photo2,
    thumbnail: photo2,
    tags: ["Architecture", "Urban"],
    description: "modern architecture shot on pixel 8"
  },
  {
    id: 3,
    title: "Abstract Tech",
    location: "Studio",
    date: "2024-07-10",
    url: photo3,
    thumbnail: photo3,
    tags: ["Abstract", "Tech"],
    description: "abstract tech visual"
  },
  {
    id: 4,
    title: "Nature Detail",
    location: "Forest Path",
    date: "2024-04-18",
    url: photo1,
    thumbnail: photo1,
    tags: ["Nature", "Photography"],
    description: "nature photography close-up"
  },
  {
    id: 5,
    title: "City Skyline",
    location: "Downtown",
    date: "2024-08-05",
    url: photo2,
    thumbnail: photo2,
    tags: ["Urban", "Architecture"],
    description: "city skyline at dusk"
  },
  {
    id: 6,
    title: "Geometric Patterns",
    location: "Design Studio",
    date: "2024-03-25",
    url: photo3,
    thumbnail: photo3,
    tags: ["Abstract", "Design"],
    description: "geometric patterns and shapes"
  }
];

export default function Favorites() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [movies] = useState<Movie[]>(mockMovies);
  const [photos] = useState<Photo[]>(mockPhotos);
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
    <div className="min-h-screen pt-24 pb-20 px-6 bg-terminal-bg text-terminal-text">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-mono font-bold text-terminal-accent-info mb-2">
            <span className="text-terminal-muted">$</span> cat ./favorites.json
          </h1>
          <p className="text-sm font-mono text-terminal-muted">
            # Personal collection of movies and photos I love
          </p>
        </header>

        {/* Tabs */}
        <Tabs defaultValue="movies" className="w-full" onValueChange={() => setSearchQuery("")}>
          <TabsList className="bg-terminal-bg border border-terminal-muted mb-6">
            <TabsTrigger 
              value="movies" 
              className="font-mono data-[state=active]:bg-terminal-accent-info/20 data-[state=active]:text-terminal-accent-info"
            >
              🎬 movies ({movies.length})
            </TabsTrigger>
            <TabsTrigger 
              value="photos" 
              className="font-mono data-[state=active]:bg-terminal-accent-info/20 data-[state=active]:text-terminal-accent-info"
            >
              📸 pics ({photos.length})
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
                  className="font-mono"
                >
                  <LayoutGrid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  aria-label="List view"
                  className="font-mono"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex gap-2 flex-wrap items-center">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-terminal-muted" />
                  <Input
                    placeholder="search movies..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8 w-64 font-mono bg-terminal-bg border-terminal-muted"
                  />
                </div>

                <Select value={sortBy} onValueChange={(v: any) => setSortBy(v)}>
                  <SelectTrigger className="w-40 font-mono bg-terminal-bg border-terminal-muted">
                    <SelectValue placeholder="sort by" />
                  </SelectTrigger>
                  <SelectContent className="font-mono">
                    <SelectItem value="rating">rating</SelectItem>
                    <SelectItem value="title">title</SelectItem>
                    <SelectItem value="year">year</SelectItem>
                    <SelectItem value="dateAdded">date added</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filterGenre} onValueChange={setFilterGenre}>
                  <SelectTrigger className="w-40 font-mono bg-terminal-bg border-terminal-muted">
                    <SelectValue placeholder="filter genre" />
                  </SelectTrigger>
                  <SelectContent className="font-mono">
                    {allGenres.map((genre) => (
                      <SelectItem key={genre} value={genre}>
                        {genre === "all" ? "all genres" : genre.toLowerCase()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleExport("movies")}
                  aria-label="Export movies as JSON"
                  className="font-mono border-terminal-muted"
                >
                  <Download className="w-4 h-4 mr-2" />
                  export
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
                  className={`border border-terminal-muted rounded-lg overflow-hidden hover:border-terminal-accent-info transition-all duration-200 ${
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
                    <h3 className="text-lg font-mono font-bold text-terminal-accent-info mb-1">
                      {movie.title}
                    </h3>
                    <p className="text-sm font-mono text-terminal-muted mb-2">
                      {movie.year} • {movie.director}
                    </p>
                    <div className="flex items-center gap-2 mb-3">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-mono font-bold">{movie.rating}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {movie.genre.map((g) => (
                        <Badge key={g} variant="secondary" className="text-xs font-mono">
                          {g.toLowerCase()}
                        </Badge>
                      ))}
                    </div>
                    {movie.notes && (
                      <p className="text-xs font-mono text-terminal-muted mb-3 italic">
                        # {movie.notes}
                      </p>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSelectedMovie(movie)}
                      className="w-full font-mono border-terminal-muted hover:border-terminal-accent-action"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      watch trailer
                    </Button>
                  </div>
                </article>
              ))}
            </div>

            {filteredMovies.length === 0 && (
              <div className="text-center py-12 text-terminal-muted font-mono">
                <p># no movies found matching your filters</p>
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
                  placeholder="search pics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 w-64 font-mono bg-terminal-bg border-terminal-muted"
                />
              </div>

              <div className="flex gap-2">
                <Select value={filterTag} onValueChange={setFilterTag}>
                  <SelectTrigger className="w-40 font-mono bg-terminal-bg border-terminal-muted">
                    <SelectValue placeholder="filter tag" />
                  </SelectTrigger>
                  <SelectContent className="font-mono">
                    {allTags.map((tag) => (
                      <SelectItem key={tag} value={tag}>
                        {tag === "all" ? "all tags" : tag.toLowerCase()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleExport("photos")}
                  aria-label="Export photos as JSON"
                  className="font-mono border-terminal-muted"
                >
                  <Download className="w-4 h-4 mr-2" />
                  export
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
                  className="border border-terminal-muted rounded-lg overflow-hidden hover:border-terminal-accent-info transition-all duration-200 cursor-pointer group"
                  onClick={() => setSelectedPhoto(photo)}
                  role="listitem"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={photo.thumbnail}
                      alt={photo.title}
                      loading="lazy"
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-mono font-bold text-terminal-accent-info mb-2">
                      {photo.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm font-mono text-terminal-muted mb-2">
                      <MapPin className="w-4 h-4" />
                      <span>{photo.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-mono text-terminal-muted mb-3">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(photo.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {photo.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs font-mono">
                          {tag.toLowerCase()}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {filteredPhotos.length === 0 && (
              <div className="text-center py-12 text-terminal-muted font-mono">
                <p># no pics found matching your filters</p>
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
                <h2 className="text-2xl font-mono font-bold text-terminal-accent-info">
                  {selectedMovie.title} ({selectedMovie.year})
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedMovie(null)}
                  aria-label="Close trailer"
                  className="font-mono"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
              <div className="aspect-video bg-black rounded overflow-hidden">
                <iframe
                  src={selectedMovie.trailer}
                  title={`${selectedMovie.title} trailer`}
                  className="w-full h-full"
                  allowFullScreen
                />
              </div>
              <p className="text-sm font-mono text-terminal-muted mt-4">
                Press <kbd className="px-2 py-1 bg-terminal-muted/20 rounded font-mono">[esc]</kbd> to close
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
                  <h2 className="text-2xl font-mono font-bold text-terminal-accent-info mb-2">
                    {selectedPhoto.title}
                  </h2>
                  <div className="flex items-center gap-4 text-sm font-mono text-terminal-muted">
                    <span>📍 {selectedPhoto.location}</span>
                    <span>📅 {new Date(selectedPhoto.date).toLocaleDateString()}</span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedPhoto(null)}
                  aria-label="Close photo"
                  className="font-mono"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.title}
                className="w-full h-auto max-h-[70vh] object-contain rounded mb-4"
              />
              <p className="font-mono text-terminal-text mb-4"># {selectedPhoto.description}</p>
              <div className="flex flex-wrap gap-2">
                {selectedPhoto.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="font-mono">
                    {tag.toLowerCase()}
                  </Badge>
                ))}
              </div>
              <p className="text-sm font-mono text-terminal-muted mt-4">
                Press <kbd className="px-2 py-1 bg-terminal-muted/20 rounded font-mono">[esc]</kbd> to close
              </p>
            </div>
          </dialog>
        )}
      </div>
    </div>
  );
}
