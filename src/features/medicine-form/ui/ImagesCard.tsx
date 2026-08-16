import { useCallback } from 'react';
import { useFormContext, useFormState } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { PackagePlus } from 'lucide-react';

import type { MedicineFormData, ImageFile } from '@/entities/medicine';
import { useFieldError } from '@/shared/lib';
import {
  Card,
  CardContent,
  CardHeader,
  FieldError,
  CardSectionHeader,
} from '@/shared/ui';

import { ImageDropzone } from './ImageDropzone';

type Props = {
  images: ImageFile[];
  existingImages?: string[];
  imagesRequired?: boolean;
  isPending?: boolean;
  onAdd: (files: ImageFile[]) => void;
  onRemove: (id: string) => void;
};

const EMPTY_IMAGES: string[] = [];

export function ImagesCard({
  images,
  existingImages = EMPTY_IMAGES,
  imagesRequired = true,
  isPending,
  onAdd,
  onRemove,
}: Props) {
  const { register, setValue } = useFormContext<MedicineFormData>();
  const { errors, isSubmitted } = useFormState<MedicineFormData>({
    name: ['imagesCount'],
  });
  const { te } = useFieldError();

  const { t } = useTranslation('medicines', { keyPrefix: 'form' });

  const handleAdd = useCallback(
    (files: ImageFile[]) => {
      setValue('imagesCount', images.length + files.length, {
        shouldDirty: true,
        shouldValidate: isSubmitted,
      });
      onAdd(files);
    },
    [images.length, isSubmitted, onAdd, setValue],
  );

  const handleRemove = useCallback(
    (id: string) => {
      setValue('imagesCount', Math.max(images.length - 1, 0), {
        shouldDirty: true,
        shouldValidate: isSubmitted,
      });
      onRemove(id);
    },
    [images.length, isSubmitted, onRemove, setValue],
  );

  const showExistingImages = images.length === 0 && existingImages.length > 0;
  const showReplacementHint = images.length > 0 && existingImages.length > 0;

  const photosDescription = showExistingImages
    ? t('currentPhotosSubtitle', { imagesCount: existingImages.length })
    : t('productPhotosSubtitle', {
        imagesCount: images.length,
      });

  return (
    <Card>
      <CardHeader>
        <CardSectionHeader
          icon={PackagePlus}
          title={t('productPhotosTitle')}
          description={photosDescription}
        />
      </CardHeader>

      <CardContent>
        <input
          type="hidden"
          {...register('imagesCount', {
            disabled: isPending,
            validate: imagesRequired
              ? (value) => Number(value) > 0 || 'imagesRequired'
              : undefined,
          })}
        />

        <ImageDropzone
          images={images}
          disabled={isPending}
          hasError={Boolean(errors.imagesCount)}
          onAdd={handleAdd}
          onRemove={handleRemove}
        />

        {showReplacementHint ? (
          <p className="text-muted-foreground mt-3 text-xs">
            {t('replacementPhotosHint')}
          </p>
        ) : null}

        {showExistingImages ? (
          <div className="mt-4 space-y-3">
            <div>
              <p className="text-foreground text-sm font-medium">
                {t('currentPhotosTitle')}
              </p>
              <p className="text-muted-foreground text-xs">
                {t('currentPhotosHint')}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {existingImages.map((imageUrl, index) => (
                <div
                  key={`${imageUrl}-${index}`}
                  className="border-border bg-muted relative aspect-square overflow-hidden rounded-lg border"
                >
                  <img
                    src={imageUrl}
                    alt={t('currentImageAlt', { index: index + 1 })}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {errors.imagesCount ? (
          <FieldError
            errors={te(errors.imagesCount, 'images')}
            className="mt-3"
          />
        ) : null}
      </CardContent>
    </Card>
  );
}
