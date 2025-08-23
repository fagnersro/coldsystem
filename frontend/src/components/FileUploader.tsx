import { useCallback, useRef, useState } from "react";
import { UploadCloud, Image as ImageIcon, X } from "lucide-react";
import { cn } from "../lib/utils";

interface FileUploaderProps {
  value?: File[];
  onChange?: (files: File[]) => void;
  accept?: string;
  maxFiles?: number;
}

export function FileUploader({ value, onChange, accept = "image/*", maxFiles = 10 }: FileUploaderProps) {
  const [files, setFiles] = useState<File[]>(value ?? []);
  const inputRef = useRef<HTMLInputElement>(null);

  const emit = (next: File[]) => {
    setFiles(next);
    onChange?.(next);
  };

  const handleFiles = useCallback(
    (fileList: FileList | null) => {
      if (!fileList) return;
      const incoming = Array.from(fileList).slice(0, Math.max(0, maxFiles - files.length));
      emit([...files, ...incoming]);
    },
    [files, maxFiles]
  );

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    handleFiles(e.dataTransfer.files);
  };

  const removeAt = (idx: number) => {
    const next = files.filter((_, i) => i !== idx);
    emit(next);
  };

  return (
    <div className="space-y-3">
      <div
        role="button"
        tabIndex={0}
        aria-label="Área para arrastar e soltar imagens"
        className={cn(
          "rounded-lg border border-dashed p-6 text-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          "bg-card hover:bg-accent/30 transition-colors"
        )}
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') inputRef.current?.click(); }}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
        <div className="flex flex-col items-center gap-2">
          <UploadCloud className="text-primary" />
          <p className="text-sm text-muted-foreground">Arraste e solte as fotos, ou clique para selecionar</p>
        </div>
      </div>

      {files.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {files.map((file, idx) => {
            const preview = URL.createObjectURL(file);
            return (
              <div key={idx} className="relative group rounded-md overflow-hidden border bg-card">
                <img src={preview} alt={`Foto ${idx + 1}`} className="aspect-square object-cover w-full h-full" loading="lazy" />
                <button
                  type="button"
                  className="absolute top-1.5 right-1.5 inline-flex items-center justify-center h-7 w-7 rounded-md bg-background/80 backdrop-blur border hover:bg-background transition"
                  aria-label="Remover imagem"
                  onClick={() => removeAt(idx)}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
