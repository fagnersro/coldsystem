import { useState } from "react";
import { Dialog, DialogContent } from "./ui/dialog";

interface PhotoGalleryProps {
  images: string[];
}

export function PhotoGallery({ images }: PhotoGalleryProps) {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<string | null>(null);

  const openImage = (src: string) => {
    setCurrent(src);
    setOpen(true);
  };

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {images.map((src, i) => (
          <button
            key={i}
            type="button"
            className="rounded-md overflow-hidden border bg-card hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            onClick={() => openImage(src)}
          >
            <img src={src} alt={`Foto ${i + 1}`} className="aspect-square object-cover w-full h-full" loading="lazy" />
          </button>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl p-2 sm:p-4">
          {current && (
            <img src={current} alt="Foto" className="w-full h-auto rounded-md" />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
