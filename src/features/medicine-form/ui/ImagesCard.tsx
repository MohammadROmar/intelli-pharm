import { useEffect } from 'react';
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
  ImageDropzone,
} from '@/shared/ui';

type Props = {
  images: ImageFile[];
  isPending?: boolean;
  onAdd: (files: ImageFile[]) => void;
  onRemove: (id: string) => void;
};

export function ImagesCard({ images, isPending, onAdd, onRemove }: Props) {
  const { register, setValue } = useFormContext<MedicineFormData>();
  const { errors, isSubmitted } = useFormState<MedicineFormData>({
    name: ['imagesCount'],
  });
  const { te } = useFieldError();

  const { t } = useTranslation('medicines', { keyPrefix: 'form' });

  useEffect(() => {
    setValue('imagesCount', images.length, {
      shouldValidate: isSubmitted,
    });
  }, [images.length, isSubmitted, setValue]);

  return (
    <Card>
      <CardHeader>
        <CardSectionHeader
          icon={PackagePlus}
          title={t('productPhotosTitle')}
          description={t('productPhotosSubtitle', {
            imagesCount: images.length,
          })}
        />
      </CardHeader>

      <CardContent>
        <input
          type="hidden"
          {...register('imagesCount', {
            disabled: isPending,
            validate: (v) => Number(v) > 0 || 'imagesRequired',
          })}
        />

        <ImageDropzone
          images={images}
          disabled={isPending}
          hasError={!!errors.imagesCount}
          onAdd={onAdd}
          onRemove={onRemove}
        />

        {errors.imagesCount && (
          <FieldError
            errors={te(errors.imagesCount, 'images')}
            className="mt-3"
          />
        )}
      </CardContent>
    </Card>
  );
}
