import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { GripVertical, ImagePlus, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { Badge } from './badge';
import { cn } from '../lib';

type ImageFile = {
  id: string;
  file: File;
  preview: string;
};

type ImageDropzoneProps = {
  images: ImageFile[];
  disabled?: boolean;
  hasError?: boolean;
  onAdd: (files: ImageFile[]) => void;
  onRemove: (id: string) => void;
};

export function ImageDropzone({
  images,
  disabled,
  onAdd,
  hasError,
  onRemove,
}: ImageDropzoneProps) {
  const { t } = useTranslation('translation', { keyPrefix: 'dragNDrop' });

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const next: ImageFile[] = acceptedFiles.map((file) => ({
        id: crypto.randomUUID(),
        file,
        preview: URL.createObjectURL(file),
      }));
      onAdd(next);
    },
    [onAdd],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.png', '.jpg', '.jpeg'] },
    multiple: true,
    disabled,
  });

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={cn(
          'relative flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 transition-all duration-200',
          isDragActive
            ? 'border-primary bg-primaborder-primary/10 scale-[1.01]'
            : hasError
              ? 'border-destructive'
              : 'border-border bg-muted/20 hover:bg-muted/40 hover:border-primary/60',
          disabled && 'border-border! bg-card! cursor-not-allowed! opacity-60',
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-2 text-center">
          <div
            className={`rounded-full p-3 transition-colors ${
              isDragActive ? 'bg-primaborder-primary/20' : 'bg-muted'
            }`}
          >
            <ImagePlus
              className={`size-6 transition-colors ${
                isDragActive ? 'text-primary' : 'text-muted-foreground'
              }`}
            />
          </div>
          {isDragActive ? (
            <p className="text-primary text-sm font-medium">{t('dropHere')}</p>
          ) : (
            <>
              <p className="text-foreground text-sm font-medium">
                {t('dnd')}{' '}
                <span className="text-primary underline-offset-2 hover:underline">
                  {t('browse')}
                </span>
              </p>
              <p className="text-muted-foreground text-xs">PNG, JPG, JPEG</p>
            </>
          )}
        </div>
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {images.map((img, i) => (
            <div
              key={img.id}
              className="group border-border bg-muted relative aspect-square overflow-hidden rounded-lg border"
            >
              <img
                src={img.preview}
                alt={`Preview ${i + 1}`}
                className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/40" />
              <button
                type="button"
                onClick={() => onRemove(img.id)}
                className="bg-destructive absolute top-1.5 right-1.5 flex size-6 items-center justify-center rounded-full text-white opacity-0 shadow-md transition-all duration-150 group-hover:opacity-100 hover:scale-110"
              >
                <X className="size-3.5" />
              </button>
              <div className="absolute bottom-1.5 left-1.5 opacity-0 transition-opacity group-hover:opacity-100">
                <GripVertical className="size-4 text-white/80" />
              </div>
              <Badge className="absolute right-1.5 bottom-1.5 h-5 rounded-sm bg-black/60 px-1.5 text-[10px] text-white opacity-0 transition-opacity group-hover:opacity-100">
                {i + 1}
              </Badge>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
