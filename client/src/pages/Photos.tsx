import PhotoGalleryItem from "@/components/PhotoGalleryItem";
import photo1 from '@assets/generated_images/Nature_photo_one_c2ff85be.png';
import photo2 from '@assets/generated_images/Architecture_photo_617368a3.png';
import photo3 from '@assets/generated_images/Abstract_tech_visual_1ab6a0b2.png';

// TODO: remove mock functionality
const photos = [
  { src: photo1, alt: "sunset landscape" },
  { src: photo2, alt: "modern architecture" },
  { src: photo3, alt: "abstract art" },
  { src: photo1, alt: "nature photography" },
  { src: photo2, alt: "city skyline" },
  { src: photo3, alt: "geometric patterns" },
];

export default function Photos() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-mono font-bold mb-4">pics</h1>
        <p className="text-sm font-mono text-muted-foreground mb-12">
          just some random photos. shot on pixel 8.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {photos.map((photo, index) => (
            <PhotoGalleryItem key={index} {...photo} />
          ))}
        </div>
      </div>
    </div>
  );
}
