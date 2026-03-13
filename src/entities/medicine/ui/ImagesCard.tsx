import { PackagePlus } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import type { ImageFile } from '../model/medicineTypes';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  FormSectionHeader,
  ImageDropzone,
} from '@/shared/ui';

interface Props {
  images: ImageFile[];
  onAdd: (files: ImageFile[]) => void;
  onRemove: (id: string) => void;
}

export function ImagesCard({ images, onAdd, onRemove }: Props) {
  const { t } = useTranslation('translation', {
    keyPrefix: 'medicinesPage.form',
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('medicineImagesTitle')}</CardTitle>
        <CardDescription>{t('medicineImagesSubtitle')}</CardDescription>
      </CardHeader>

      <CardContent>
        <FormSectionHeader
          icon={PackagePlus}
          title={t('productPhotosTitle')}
          description={t('productPhotosSubtitle', {
            imagesCount: images.length,
          })}
        />
        <ImageDropzone images={images} onAdd={onAdd} onRemove={onRemove} />
      </CardContent>
    </Card>
  );
}
