import { memo, useCallback, useEffect, useId, useRef, useState } from 'react';
import { useDropzone, type FileRejection } from 'react-dropzone';
import { ImagePlus, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { Badge } from '@/shared/ui';
import { cn } from '@/shared/lib';

const MAX_IMAGES = 3;
const MAX_IMAGE_SIZE_BYTES = 2_000_000;
const MAX_IMAGE_SIZE_MB = 2;
const ACCEPTED_IMAGE_TYPES = {
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/png': ['.png'],
};

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
  const handleRemove = () => {
    onRemove(id);
  };

  return (
    <div className="group border-border bg-muted relative aspect-square overflow-hidden rounded-lg border">
      <img
        src={preview}
        alt={fileName}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
      />
      <div className="bg-foreground/40 pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100" />
      <button
        type="button"
        onClick={handleRemove}
        aria-label={removeLabel}
        className="bg-destructive text-destructive-foreground absolute top-1.5 right-1.5 flex size-8 items-center justify-center rounded-full shadow-md transition-transform duration-150 hover:scale-110 focus-visible:opacity-100 sm:size-6 sm:opacity-0 sm:group-hover:opacity-100"
      >
        <X className="size-3.5" />
      </button>
      <Badge className="bg-background/80 text-foreground! pointer-events-none absolute right-1.5 bottom-1.5 h-5 rounded-sm px-1.5 text-[10px] opacity-100 transition-opacity sm:opacity-0 sm:group-hover:opacity-100">
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
  const constraintsId = useId();
  const errorId = useId();
  const [dropError, setDropError] = useState<string | null>(null);
  const ownedPreviewsRef = useRef<Set<string>>(new Set());

  const remainingSlots = Math.max(MAX_IMAGES - images.length, 0);
  const isAtLimit = remainingSlots === 0;
  const isDropzoneDisabled = Boolean(disabled) || isAtLimit;

  useEffect(() => {
    const currentPreviews = new Set(images.map((image) => image.preview));

    ownedPreviewsRef.current.forEach((preview) => {
      if (!currentPreviews.has(preview)) {
        URL.revokeObjectURL(preview);
        ownedPreviewsRef.current.delete(preview);
      }
    });
  }, [images]);

  useEffect(() => {
    const ownedPreviews = ownedPreviewsRef.current;

    return () => {
      ownedPreviews.forEach((preview) => {
        URL.revokeObjectURL(preview);
      });
      ownedPreviews.clear();
    };
  }, []);

  const getRejectionMessage = useCallback(
    (fileRejections: FileRejection[]) => {
      const errorCodes = new Set(
        fileRejections.flatMap(({ errors }) => errors.map(({ code }) => code)),
      );

      if (errorCodes.has('too-many-files')) {
        return t('errors.tooManyFiles', { maxFiles: MAX_IMAGES });
      }

      if (errorCodes.has('file-too-large')) {
        return t('errors.fileTooLarge', { maxSizeMb: MAX_IMAGE_SIZE_MB });
      }

      if (errorCodes.has('file-invalid-type')) {
        return t('errors.invalidType');
      }

      return t('errors.rejected');
    },
    [t],
  );

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      if (fileRejections.length > 0) {
        setDropError(getRejectionMessage(fileRejections));
      } else {
        setDropError(null);
      }

      if (acceptedFiles.length === 0) {
        return;
      }

      const next: ImageFile[] = acceptedFiles.map((file) => {
        const preview = URL.createObjectURL(file);
        ownedPreviewsRef.current.add(preview);

        return {
          id: crypto.randomUUID(),
          file,
          preview,
        };
      });

      onAdd(next);
    },
    [getRejectionMessage, onAdd],
  );

  const handleRemove = useCallback(
    (id: string) => {
      setDropError(null);
      onRemove(id);
    },
    [onRemove],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPTED_IMAGE_TYPES,
    maxSize: MAX_IMAGE_SIZE_BYTES,
    maxFiles: remainingSlots,
    multiple: true,
    disabled: isDropzoneDisabled,
  });

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        aria-describedby={`${constraintsId}${dropError ? ` ${errorId}` : ''}`}
        aria-disabled={isDropzoneDisabled}
        aria-invalid={Boolean(hasError) || Boolean(dropError)}
        className={cn(
          'relative flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 transition-all duration-200',
          isDragActive
            ? 'border-primary bg-primary/10 scale-[1.01]'
            : hasError || dropError
              ? 'border-destructive bg-destructive/5'
              : 'border-border bg-muted/20 hover:bg-muted/40 hover:border-primary/60',
          isDropzoneDisabled &&
            'border-border! bg-card! cursor-not-allowed! opacity-60',
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
            <p className="text-foreground text-sm font-medium">
              {isAtLimit ? (
                t('limitReached', { maxFiles: MAX_IMAGES })
              ) : (
                <>
                  {t('dnd')}{' '}
                  <span className="text-primary underline-offset-2 hover:underline">
                    {t('browse')}
                  </span>
                </>
              )}
            </p>
          )}
          <p id={constraintsId} className="text-muted-foreground text-xs">
            {t('constraints', {
              maxFiles: MAX_IMAGES,
              maxSizeMb: MAX_IMAGE_SIZE_MB,
            })}
          </p>
        </div>
      </div>

      {dropError ? (
        <p id={errorId} role="alert" className="text-destructive text-sm">
          {dropError}
        </p>
      ) : null}

      {images.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {images.map((image, index) => (
            <ImagePreviewTile
              key={image.id}
              id={image.id}
              preview={image.preview}
              index={index}
              fileName={image.file.name}
              removeLabel={t('removeImage')}
              onRemove={handleRemove}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
