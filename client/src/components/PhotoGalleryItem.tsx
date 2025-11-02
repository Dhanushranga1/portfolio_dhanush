import { useState } from "react";
import { X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface PhotoGalleryItemProps {
  src: string;
  alt: string;
}

export default function PhotoGalleryItem({
  src,
  alt,
}: PhotoGalleryItemProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <>
      <div
        className="cursor-pointer border border-border overflow-hidden hover:border-primary transition-colors"
        onClick={() => setLightboxOpen(true)}
        data-testid={`photo-${alt.toLowerCase().replace(/\s+/g, '-')}`}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-auto object-cover"
        />
      </div>

      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-7xl w-full p-0 bg-background/95 backdrop-blur-lg border-border">
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 z-50 p-2 text-foreground hover:text-primary transition-colors"
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
