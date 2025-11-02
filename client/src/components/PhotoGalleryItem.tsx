import { useState } from "react";
import { X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface PhotoGalleryItemProps {
  src: string;
  alt: string;
  aspectRatio?: "square" | "portrait" | "landscape";
}

export default function PhotoGalleryItem({
  src,
  alt,
  aspectRatio = "landscape",
}: PhotoGalleryItemProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const aspectClasses = {
    square: "aspect-square",
    portrait: "aspect-[3/4]",
    landscape: "aspect-video",
  };

  return (
    <>
      <div
        className={`group relative overflow-hidden rounded-xl cursor-pointer hover-elevate active-elevate-2 transition-all ${aspectClasses[aspectRatio]}`}
        onClick={() => setLightboxOpen(true)}
        data-testid={`photo-${alt.toLowerCase().replace(/\s+/g, '-')}`}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-7xl w-full p-0 bg-background/95 backdrop-blur-lg">
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 z-50 p-2 rounded-full bg-background/80 hover-elevate active-elevate-2"
            data-testid="button-close-lightbox"
          >
            <X className="h-6 w-6" />
          </button>
          <img src={src} alt={alt} className="w-full h-auto max-h-[90vh] object-contain" />
        </DialogContent>
      </Dialog>
    </>
  );
}
