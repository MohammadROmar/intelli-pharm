import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Pencil, Trash2 } from 'lucide-react';

import { StocksCard } from './StocksCard';
import { MedicineInfoGrid } from './MedicineInfoGrid';
import { AlternativesTable } from './AlternativesTable';
import { MedicineImageGallery } from './MedicineImageGallery';
import { DeleteMedicineModal } from '@/features/medicine-delete';
import type { Medicine } from '@/entities/medicine';
import { buttonVariants } from '@/shared/lib';
import { Button } from '@/shared/ui';

type Props = { medicine: Medicine };

export function MedicineDetail({ medicine }: Props) {
  const { t } = useTranslation('translation', {
    keyPrefix: 'medicinesPage.detail',
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold tracking-tight">{medicine.name}</h1>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
          <Link
            to={`/dashboard/medicines/${medicine.id}/edit`}
            className={buttonVariants({
              variant: 'default',
              size: 'sm',
              className: 'shrink-0',
            })}
          >
            <Pencil className="size-4" />
            {t('edit')}
          </Link>
          <DeleteMedicineBtn medicine={medicine} label={t('delete')} />
        </div>
      </div>

      <div className="grid max-w-full grid-cols-1 gap-6 lg:grid-cols-3">
        <MedicineImageGallery
          images={medicine.images}
          medicineName={medicine.name}
        />
        <MedicineInfoGrid medicine={medicine} />
      </div>

      <StocksCard stocks={medicine.stocks} />
      <AlternativesTable
        mode="alternatives"
        alternatives={medicine.alternatives}
      />
      <AlternativesTable
        mode="alternativeFor"
        alternatives={medicine.alternative_for}
      />
    </div>
  );
}

function DeleteMedicineBtn({ medicine, label }: Props & { label: string }) {
  const [deleteMedicine, setDeleteMedicine] = useState<Medicine | null>(null);
  const navigate = useNavigate();

  return (
    <>
      <DeleteMedicineModal
        medicine={deleteMedicine}
        onClose={() => setDeleteMedicine(null)}
        onDeleteSuccess={() => navigate('/dashboard/medicines')}
      />

      <Button
        size="sm"
        onClick={() => setDeleteMedicine(medicine)}
        variant="destructive"
      >
        <Trash2 className="size-4" />
        {label}
      </Button>
    </>
  );
}
