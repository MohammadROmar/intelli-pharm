import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { DeleteMedicineModal } from '@/features/medicine-delete';
import { MedicineRow } from '@/entities/medicine';
import type { Medicine, MedicineResponse } from '@/entities/medicine';
import {
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCard,
  TableCardHeader,
} from '@/shared/ui';

type Props = { data: MedicineResponse };

export function MedicinesTable({ data }: Props) {
  const { t } = useTranslation('translation', { keyPrefix: 'medicinesPage' });

  const [medicineToDelete, setMedicineToDelete] = useState<Medicine | null>(
    null,
  );

  return (
    <>
      <DeleteMedicineModal
        medicine={medicineToDelete}
        onClose={() => setMedicineToDelete(null)}
      />

      <TableCard
        title={t('list.all')}
        header={
          <TableCardHeader
            createText={t('create.title')}
            placeholder={t('searchPlaceholder')}
            basePath="/dashboard/medicines"
          />
        }
        basePath="/dashboard/medicines"
        currentPage={data.meta.current_page}
        totalItems={data.meta.total}
        itemsPerPage={data.meta.per_page}
      >
        <TableHeader>
          <TableRow>
            <TableHead className="w-25">{t('list.id')}</TableHead>
            <TableHead>{t('list.name')}</TableHead>
            <TableHead>{t('list.status')}</TableHead>
            <TableHead>{t('list.price')}</TableHead>
            <TableHead>{t('list.createdAt')}</TableHead>
            <TableHead>{t('list.actions')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.data.map((medicine) => (
            <MedicineRow
              key={medicine.id}
              medicine={medicine}
              onDelete={setMedicineToDelete}
            />
          ))}
        </TableBody>
      </TableCard>
    </>
  );
}
