import { memo, useCallback, useEffect, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { ImagePlus, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { Badge } from '@/shared/ui';
import { cn } from '@/shared/lib';

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

type ImagePreviewTileProps = {
  id: string;
  preview: string;
  index: number;
  fileName: string;
  removeLabel: string;
  onRemove: (id: string) => void;
};

const ImagePreviewTile = memo(function ImagePreviewTile({
  id,
  preview,
  index,
  fileName,
  removeLabel,
  onRemove,
}: ImagePreviewTileProps) {
  const handleRemove = useCallback(() => {
    onRemove(id);
  }, [onRemove, id]);

  return (
    <div className="group border-border bg-muted relative aspect-square overflow-hidden rounded-lg border">
      <img
        src={preview}
        alt={fileName}
        className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/40" />
      <button
        type="button"
        onClick={handleRemove}
        aria-label={removeLabel}
        className="bg-destructive absolute top-1.5 right-1.5 flex size-6 items-center justify-center rounded-full text-white opacity-0 shadow-md transition-all duration-150 group-hover:opacity-100 hover:scale-110"
      >
        <X className="size-3.5" />
      </button>
      <Badge className="absolute right-1.5 bottom-1.5 h-5 rounded-sm bg-black/60! px-1.5 text-[10px] text-white! opacity-0 transition-opacity group-hover:opacity-100">
        {index + 1}
      </Badge>
    </div>
  );
});

export function ImageDropzone({
  images,
  disabled,
  onAdd,
  hasError,
  onRemove,
}: ImageDropzoneProps) {
  const { t } = useTranslation('common', { keyPrefix: 'dragNDrop' });

  const previewsRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    const current = new Set(images.map((image) => image.preview));

    previewsRef.current.forEach((preview) => {
      if (!current.has(preview)) {
        URL.revokeObjectURL(preview);
      }
    });

    previewsRef.current = current;
  }, [images]);

  useEffect(() => {
    return () => {
      previewsRef.current.forEach((preview) => URL.revokeObjectURL(preview));
    };
  }, []);

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
        aria-invalid={hasError}
        className={cn(
          'relative flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 transition-all duration-200',
          isDragActive
            ? 'border-primary bg-primary/10 scale-[1.01]'
            : hasError
              ? 'border-destructive bg-destructive/5'
              : 'border-border bg-muted/20 hover:bg-muted/40 hover:border-primary/60',
          disabled && 'border-border! bg-card! cursor-not-allowed! opacity-60',
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-2 text-center">
          <div
            className={cn(
              'rounded-full p-3 transition-colors',
              isDragActive ? 'bg-primary/20' : 'bg-muted',
            )}
          >
            <ImagePlus
              className={cn(
                'size-6 transition-colors',
                isDragActive ? 'text-primary' : 'text-muted-foreground',
              )}
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

      {images.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {images.map((image, index) => (
            <ImagePreviewTile
              key={image.id}
              id={image.id}
              preview={image.preview}
              index={index}
              fileName={image.file.name}
              removeLabel={t('removeImage', { defaultValue: 'Remove image' })}
              onRemove={onRemove}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
