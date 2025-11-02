import PhotoGalleryItem from "@/components/PhotoGalleryItem";
import photo1 from '@assets/generated_images/Nature_photo_one_c2ff85be.png';
import photo2 from '@assets/generated_images/Architecture_photo_617368a3.png';
import photo3 from '@assets/generated_images/Abstract_tech_visual_1ab6a0b2.png';
import photo4 from '@assets/generated_images/Project_dashboard_interface_694e38f2.png';

// TODO: remove mock functionality
const photos = [
  { src: photo1, alt: "Sunset landscape", aspectRatio: "portrait" as const },
  { src: photo2, alt: "Modern architecture", aspectRatio: "landscape" as const },
  { src: photo3, alt: "Abstract art", aspectRatio: "square" as const },
  { src: photo4, alt: "Urban photography", aspectRatio: "landscape" as const },
  { src: photo1, alt: "Nature photography", aspectRatio: "landscape" as const },
  { src: photo3, alt: "Geometric patterns", aspectRatio: "portrait" as const },
  { src: photo2, alt: "City skyline", aspectRatio: "square" as const },
  { src: photo4, alt: "Street photography", aspectRatio: "portrait" as const },
];

export default function Photos() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-4">
            <span className="bg-gradient-to-r from-primary via-chart-3 to-chart-2 bg-clip-text text-transparent">
              Photo Gallery
            </span>
          </h1>
          <p className="text-muted-foreground text-lg">
            A collection of moments captured through my lens
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {photos.map((photo, index) => (
            <div key={index} className="break-inside-avoid">
              <PhotoGalleryItem {...photo} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
