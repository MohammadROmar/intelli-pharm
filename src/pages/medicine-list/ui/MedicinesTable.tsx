import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { DeleteMedicineModal } from '@/features/medicine-delete';
import type { Medicine, MedicineResponse } from '@/entities/medicine';
import {
  EntityEmptyState,
  EntityFiltersToolbar,
  EntityListTable,
  TableHead,
} from '@/shared/ui';

import { MedicineRow } from './MedicineRow';
import { MedicineFiltersModal } from './MedicineFiltersModal';
import { useMedicineFilters } from '../model/useMedicineFilters';

type Props = { data: MedicineResponse };

export function MedicinesTable({ data }: Props) {
  const { t } = useTranslation('medicines');

  const [medicineToDelete, setMedicineToDelete] = useState<Medicine | null>(
    null,
  );
  const filtersState = useMedicineFilters();

  return (
    <>
      <DeleteMedicineModal
        label={medicineToDelete?.commercial_name || t('medicine')}
        medicine={medicineToDelete}
        onClose={() => setMedicineToDelete(null)}
      />
      <EntityListTable
        data={data}
        title={t('list.all')}
        addHref="/dashboard/medicines/new"
        addLabel={t('list.add')}
        basePath="/dashboard/medicines"
        toolbar={
          <EntityFiltersToolbar
            filtersState={filtersState}
            FiltersModal={MedicineFiltersModal}
          />
        }
        columns={
          <>
            <TableHead className="w-25">{t('list.id')}</TableHead>
            <TableHead>{t('list.name')}</TableHead>
            <TableHead>{t('list.status')}</TableHead>
            <TableHead>{t('list.price')}</TableHead>
            <TableHead>{t('list.createdAt')}</TableHead>
            <TableHead>{t('list.actions')}</TableHead>
          </>
        }
        renderRow={(medicine) => (
          <MedicineRow
            key={medicine.id}
            medicine={medicine}
            onDelete={setMedicineToDelete}
          />
        )}
        emptyState={
          <EntityEmptyState
            hasActiveFilters={filtersState.hasActiveFilters}
            clearFilters={filtersState.clearFilters}
          />
        }
      />
    </>
  );
}
