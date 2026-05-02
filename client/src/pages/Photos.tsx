import { useState, useRef } from "react";
import {
  Image as ImageIcon,
  Grid3x3,
  List,
  X,
  MapPin,
  Calendar,
  Camera,
  Tag,
  ChevronLeft,
  ChevronRight,
  Filter,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

// For production, replace with: import { usePhotos, usePhotoAlbums } from "@/hooks/useStrapi";
// For now, we'll use mock data since Strapi isn't set up yet

type Photo = {
  id: string;
  title: string;
  description: string;
  image: string;
  album: string | null;
  tags: string[];
  location: string | null;
  capturedAt: string | null;
  camera: string | null;
  featured: boolean;
};

type PhotoAlbum = {
  id: string;
  name: string;
  description: string;
  coverImage: string;
  slug: string;
  photoCount: number;
};

// Mock data
const MOCK_ALBUMS: PhotoAlbum[] = [
  {
    id: "1",
    name: "Nature & Landscapes",
    description: "Scenic views and natural beauty captured during travels",
    coverImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    slug: "nature-landscapes",
    photoCount: 12,
  },
  {
    id: "2",
    name: "Urban Architecture",
    description: "Modern buildings and city structures",
    coverImage: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&h=600&fit=crop",
    slug: "urban-architecture",
    photoCount: 8,
  },
  {
    id: "3",
    name: "Tech & Abstract",
    description: "Technical and abstract photography experiments",
    coverImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop",
    slug: "tech-abstract",
    photoCount: 15,
  },
];

const MOCK_PHOTOS: Photo[] = [
  {
    id: "1",
    title: "Mountain Vista",
    description: "Sunset view from mountain peak",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop",
    album: "nature-landscapes",
    tags: ["nature", "mountains", "sunset"],
    location: "Rocky Mountains, Colorado",
    capturedAt: "2024-06-15T18:30:00Z",
    camera: "Pixel 8 Pro",
    featured: true,
  },
  {
    id: "2",
    title: "City Lights",
    description: "Downtown skyline at night",
    image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1200&h=800&fit=crop",
    album: "urban-architecture",
    tags: ["urban", "architecture", "night"],
    location: "Seattle, WA",
    capturedAt: "2024-07-20T22:00:00Z",
    camera: "Pixel 8 Pro",
    featured: true,
  },
  {
    id: "3",
    title: "Circuit Board Macro",
    description: "Close-up of electronic components",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=800&fit=crop",
    album: "tech-abstract",
    tags: ["tech", "abstract", "macro"],
    location: "Home Studio",
    capturedAt: "2024-08-10T14:00:00Z",
    camera: "Pixel 8 Pro",
    featured: false,
  },
  {
    id: "4",
    title: "Forest Path",
    description: "Winding trail through dense forest",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=800&fit=crop",
    album: "nature-landscapes",
    tags: ["nature", "forest", "trails"],
    location: "Olympic National Park, WA",
    capturedAt: "2024-05-28T10:30:00Z",
    camera: "Pixel 8 Pro",
    featured: false,
  },
  {
    id: "5",
    title: "Modern Glass",
    description: "Reflective glass architecture",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=800&fit=crop",
    album: "urban-architecture",
    tags: ["urban", "architecture", "modern"],
    location: "San Francisco, CA",
    capturedAt: "2024-09-05T16:45:00Z",
    camera: "Pixel 8 Pro",
    featured: true,
  },
  {
    id: "6",
    title: "Data Visualization",
    description: "Abstract visualization of data flow",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=800&fit=crop",
    album: "tech-abstract",
    tags: ["tech", "abstract", "visualization"],
    location: "Digital",
    capturedAt: "2024-08-25T09:00:00Z",
    camera: "Generated",
    featured: false,
  },
  {
    id: "7",
    title: "Ocean Waves",
    description: "Crashing waves at sunset",
    image: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1200&h=800&fit=crop",
    album: "nature-landscapes",
    tags: ["nature", "ocean", "sunset"],
    location: "Pacific Coast, OR",
    capturedAt: "2024-07-12T19:15:00Z",
    camera: "Pixel 8 Pro",
    featured: true,
  },
  {
    id: "8",
    title: "Bridge Structure",
    description: "Geometric patterns of a suspension bridge",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=1200&h=800&fit=crop",
    album: "urban-architecture",
    tags: ["urban", "architecture", "bridges"],
    location: "Golden Gate Bridge, SF",
    capturedAt: "2024-09-01T14:30:00Z",
    camera: "Pixel 8 Pro",
    featured: false,
  },
];

type ViewMode = "masonry" | "grid" | "list";

export default function Photos() {
  const [selectedAlbum, setSelectedAlbum] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("masonry");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterTag, setFilterTag] = useState<string | null>(null);
  const [filterFeatured, setFilterFeatured] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);
  
  const lightboxDialog = useRef<HTMLDialogElement>(null);
  const { toast } = useToast();

  // Get unique tags
  const allTags = Array.from(
    new Set(MOCK_PHOTOS.flatMap((p) => p.tags))
  ).sort();

  // Filter photos
  const filteredPhotos = MOCK_PHOTOS.filter((photo) => {
    const matchesAlbum = !selectedAlbum || photo.album === selectedAlbum;
    const matchesSearch =
      searchQuery === "" ||
      photo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      photo.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      photo.location?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = !filterTag || photo.tags.includes(filterTag);
    const matchesFeatured = !filterFeatured || photo.featured;

    return matchesAlbum && matchesSearch && matchesTag && matchesFeatured;
  });

  // Open lightbox
  const openLightbox = (photo: Photo) => {
    const index = filteredPhotos.findIndex((p) => p.id === photo.id);
    setSelectedPhoto(photo);
    setLightboxIndex(index);
    lightboxDialog.current?.showModal();
  };

  // Navigate lightbox
  const nextPhoto = () => {
    const newIndex = (lightboxIndex + 1) % filteredPhotos.length;
    setLightboxIndex(newIndex);
    setSelectedPhoto(filteredPhotos[newIndex]);
  };

  const prevPhoto = () => {
    const newIndex = (lightboxIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
    setLightboxIndex(newIndex);
    setSelectedPhoto(filteredPhotos[newIndex]);
  };

  const closeLightbox = () => {
    lightboxDialog.current?.close();
    setSelectedPhoto(null);
  };

  // Get current album info
  const currentAlbum = MOCK_ALBUMS.find((a) => a.slug === selectedAlbum);

  return (
    <div className="min-h-screen bg-terminal-bg text-terminal-text pt-24 pb-20 px-6 font-mono">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-terminal-accent-blue mb-2">
                <span className="text-terminal-accent-green">❯</span>{" "}
                {currentAlbum ? currentAlbum.name : "Photo Gallery"}
              </h1>
              <p className="text-terminal-text-dim">
                {currentAlbum ? (
                  <>
                    {currentAlbum.description} • {filteredPhotos.length} photos
                  </>
                ) : (
                  <>
                    All albums • {filteredPhotos.length} of {MOCK_PHOTOS.length} photos
                  </>
                )}
              </p>
            </div>

            {/* View Toggle */}
            <div className="flex gap-2">
              <Button
                variant={viewMode === "masonry" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("masonry")}
                className="terminal-card"
                aria-label="Masonry view"
                title="Masonry layout"
              >
                <Grid3x3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("grid")}
                className="terminal-card"
                aria-label="Grid view"
                title="Grid layout"
              >
                <ImageIcon className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("list")}
                className="terminal-card"
                aria-label="List view"
                title="List view"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Back to Albums */}
          {selectedAlbum && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedAlbum(null)}
              className="mb-4"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Albums
            </Button>
          )}

          {/* Controls */}
          <div className="terminal-card p-4 space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-terminal-text-dim" />
              <Input
                type="text"
                placeholder="Search photos by title, description, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-terminal-bg-alt border-terminal-border"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3 items-center">
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

              {/* Featured Filter */}
              <Button
                variant={filterFeatured ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterFeatured(!filterFeatured)}
                className={filterFeatured ? "bg-terminal-accent-yellow" : ""}
              >
                <ImageIcon className="h-4 w-4 mr-2" />
                Featured Only
              </Button>
            </div>

            {/* Active Filters */}
            {(searchQuery || filterTag || filterFeatured) && (
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
                {filterFeatured && (
                  <Badge variant="secondary" className="gap-1">
                    Featured
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => setFilterFeatured(false)}
                    />
                  </Badge>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Albums Grid (show if no album selected) */}
        {!selectedAlbum && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-terminal-accent-blue mb-4">
              Albums
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {MOCK_ALBUMS.map((album) => (
                <Card
                  key={album.id}
                  className="terminal-card overflow-hidden cursor-pointer group hover:border-terminal-accent-blue transition-colors"
                  onClick={() => setSelectedAlbum(album.slug)}
                >
                  <div className="aspect-video relative overflow-hidden bg-terminal-bg-alt">
                    <img
                      src={album.coverImage}
                      alt={album.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-terminal-bg/90 to-transparent flex items-end p-4">
                      <div>
                        <h3 className="font-bold text-terminal-accent-blue text-lg mb-1">
                          {album.name}
                        </h3>
                        <p className="text-sm text-terminal-text-dim">
                          {album.photoCount} photos
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-terminal-text-dim">
                      {album.description}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Featured Photos */}
        {!selectedAlbum && !searchQuery && !filterTag && !filterFeatured && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-terminal-accent-blue mb-4">
              Featured Photos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {MOCK_PHOTOS.filter((p) => p.featured)
                .slice(0, 6)
                .map((photo) => (
                  <Card
                    key={photo.id}
                    className="terminal-card overflow-hidden cursor-pointer group hover:border-terminal-accent-blue transition-colors"
                    onClick={() => openLightbox(photo)}
                  >
                    <div className="aspect-[4/3] relative overflow-hidden bg-terminal-bg-alt">
                      <img
                        src={photo.image}
                        alt={photo.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-3">
                      <h3 className="font-bold text-terminal-accent-blue mb-1">
                        {photo.title}
                      </h3>
                      <p className="text-sm text-terminal-text-dim line-clamp-1">
                        {photo.description}
                      </p>
                    </div>
                  </Card>
                ))}
            </div>
          </div>
        )}

        {/* Photos Display */}
        {filteredPhotos.length === 0 ? (
          <div className="terminal-card p-12 text-center">
            <p className="text-terminal-text-dim text-lg">
              No photos found matching your criteria
            </p>
          </div>
        ) : viewMode === "masonry" ? (
          /* Masonry Layout */
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
            {filteredPhotos.map((photo) => (
              <Card
                key={photo.id}
                className="terminal-card overflow-hidden mb-6 break-inside-avoid cursor-pointer group hover:border-terminal-accent-blue transition-colors"
                onClick={() => openLightbox(photo)}
              >
                <div className="relative overflow-hidden bg-terminal-bg-alt">
                  <img
                    src={photo.image}
                    alt={photo.title}
                    className="w-full h-auto group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  {photo.featured && (
                    <Badge
                      variant="secondary"
                      className="absolute top-2 right-2 bg-terminal-accent-yellow text-terminal-bg"
                    >
                      Featured
                    </Badge>
                  )}
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="font-bold text-terminal-accent-blue">
                    {photo.title}
                  </h3>
                  <p className="text-sm text-terminal-text-dim">
                    {photo.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {photo.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  {photo.location && (
                    <p className="text-xs text-terminal-text-dim flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {photo.location}
                    </p>
                  )}
                </div>
              </Card>
            ))}
          </div>
        ) : viewMode === "grid" ? (
          /* Grid Layout */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPhotos.map((photo) => (
              <Card
                key={photo.id}
                className="terminal-card overflow-hidden cursor-pointer group hover:border-terminal-accent-blue transition-colors"
                onClick={() => openLightbox(photo)}
              >
                <div className="aspect-[4/3] relative overflow-hidden bg-terminal-bg-alt">
                  <img
                    src={photo.image}
                    alt={photo.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  {photo.featured && (
                    <Badge
                      variant="secondary"
                      className="absolute top-2 right-2 bg-terminal-accent-yellow text-terminal-bg"
                    >
                      Featured
                    </Badge>
                  )}
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="font-bold text-terminal-accent-blue">
                    {photo.title}
                  </h3>
                  <p className="text-sm text-terminal-text-dim line-clamp-2">
                    {photo.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {photo.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          /* List View */
          <div className="space-y-4">
            {filteredPhotos.map((photo) => (
              <Card
                key={photo.id}
                className="terminal-card p-4 cursor-pointer hover:border-terminal-accent-blue transition-colors"
                onClick={() => openLightbox(photo)}
              >
                <div className="flex gap-4">
                  <div className="w-32 h-24 flex-shrink-0 bg-terminal-bg-alt rounded overflow-hidden">
                    <img
                      src={photo.image}
                      alt={photo.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-terminal-accent-blue">
                        {photo.title}
                      </h3>
                      {photo.featured && (
                        <Badge variant="secondary" className="bg-terminal-accent-yellow text-terminal-bg">
                          Featured
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-terminal-text-dim mb-2">
                      {photo.description}
                    </p>
                    <div className="flex flex-wrap gap-3 text-xs text-terminal-text-dim">
                      {photo.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {photo.location}
                        </span>
                      )}
                      {photo.capturedAt && (
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(photo.capturedAt).toLocaleDateString()}
                        </span>
                      )}
                      {photo.camera && (
                        <span className="flex items-center gap-1">
                          <Camera className="h-3 w-3" />
                          {photo.camera}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {photo.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Dialog */}
      <dialog
        ref={lightboxDialog}
        className="backdrop:bg-black/95 bg-transparent border-0 p-0 max-w-screen max-h-screen w-full h-full"
        onClick={(e) => {
          if (e.target === lightboxDialog.current) {
            closeLightbox();
          }
        }}
        onKeyDown={(e) => {
          if (e.key === "Escape") closeLightbox();
          if (e.key === "ArrowRight") nextPhoto();
          if (e.key === "ArrowLeft") prevPhoto();
        }}
      >
        {selectedPhoto && (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 relative">
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-50 p-2 bg-terminal-bg/80 backdrop-blur-sm rounded-full hover:bg-terminal-bg transition-colors text-terminal-text"
              aria-label="Close"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Navigation Buttons */}
            {filteredPhotos.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevPhoto();
                  }}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 z-50 p-3 bg-terminal-bg/80 backdrop-blur-sm rounded-full hover:bg-terminal-bg transition-colors text-terminal-text"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextPhoto();
                  }}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 z-50 p-3 bg-terminal-bg/80 backdrop-blur-sm rounded-full hover:bg-terminal-bg transition-colors text-terminal-text"
                  aria-label="Next photo"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}

            {/* Image */}
            <div className="max-w-6xl max-h-[80vh] flex items-center justify-center">
              <img
                src={selectedPhoto.image}
                alt={selectedPhoto.title}
                className="max-w-full max-h-full object-contain"
              />
            </div>

            {/* Info */}
            <div className="mt-6 max-w-4xl w-full bg-terminal-bg/80 backdrop-blur-sm rounded-lg p-6 text-terminal-text">
              <h2 className="text-2xl font-bold text-terminal-accent-blue mb-2">
                {selectedPhoto.title}
              </h2>
              <p className="text-terminal-text-dim mb-4">
                {selectedPhoto.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-4">
                {selectedPhoto.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-terminal-accent-blue" />
                    <span>{selectedPhoto.location}</span>
                  </div>
                )}
                {selectedPhoto.capturedAt && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-terminal-accent-blue" />
                    <span>
                      {new Date(selectedPhoto.capturedAt).toLocaleDateString()}
                    </span>
                  </div>
                )}
                {selectedPhoto.camera && (
                  <div className="flex items-center gap-2">
                    <Camera className="h-4 w-4 text-terminal-accent-blue" />
                    <span>{selectedPhoto.camera}</span>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                {selectedPhoto.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>

              {filteredPhotos.length > 1 && (
                <p className="mt-4 text-sm text-terminal-text-dim text-center">
                  Photo {lightboxIndex + 1} of {filteredPhotos.length} •
                  Use arrow keys to navigate
                </p>
              )}
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
}
