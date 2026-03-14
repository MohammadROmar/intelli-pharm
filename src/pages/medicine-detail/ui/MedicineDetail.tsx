import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Pencil } from 'lucide-react';

import { MedicineImageGallery } from './MedicineImageGallery';
import { MedicineInfoGrid } from './MedicineInfoGrid';
import { AlternativesTable } from './AlternativesTable';
import { buttonVariants } from '@/shared/lib';
import type { MedicineDetail } from '../model/medicineDetailTypes';

type MedicineDetailProps = { medicine: MedicineDetail };

export function MedicineDetail({ medicine }: MedicineDetailProps) {
  const { t } = useTranslation('translation', {
    keyPrefix: 'medicinesPage.detail',
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold tracking-tight">{medicine.name}</h1>

        <Link
          to="/dashboard/medicines/1/edit"
          className={buttonVariants({
            variant: 'default',
            size: 'sm',
            className: 'shrink-0',
          })}
        >
          <Pencil className="mr-1.5 size-4" />
          {t('edit')}
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[2fr_3fr]">
        <MedicineImageGallery
          images={medicine.images}
          medicineName={medicine.name}
        />
        <MedicineInfoGrid medicine={medicine} />
      </div>

      <AlternativesTable alternatives={medicine.alternatives} />
    </div>
  );
}
