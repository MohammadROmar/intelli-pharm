import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useMedicineAccess } from '@/features/medicine-acces';
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

  const actionAccess = useMedicineAccess();

  const handleDeleteModalClose = useCallback(() => {
    setMedicineToDelete(null);
  }, []);

  const renderRow = useCallback(
    (medicine: Medicine) => (
      <MedicineRow
        key={medicine.id}
        medicine={medicine}
        actionAccess={actionAccess}
        onDelete={setMedicineToDelete}
      />
    ),
    [actionAccess],
  );

  return (
    <>
      {actionAccess.canDelete && (
        <DeleteMedicineModal
          label={medicineToDelete?.commercial_name ?? t('medicine')}
          medicine={medicineToDelete}
          onClose={handleDeleteModalClose}
        />
      )}

      <EntityListTable
        data={data}
        title={t('list.all')}
        addButton={
          actionAccess.canCreate
            ? {
                addHref: '/dashboard/medicines/new',
                addLabel: t('list.add'),
              }
            : undefined
        }
        basePath="/dashboard/medicines"
        toolbar={
          <EntityFiltersToolbar
            filtersState={filtersState}
            FiltersModal={MedicineFiltersModal}
          />
        }
        columns={
          <>
            <TableHead>{t('list.name')}</TableHead>
            <TableHead>{t('list.status')}</TableHead>
            <TableHead>{t('list.price')}</TableHead>
            <TableHead>{t('list.createdAt')}</TableHead>
            <TableHead>{t('list.actions')}</TableHead>
          </>
        }
        renderRow={renderRow}
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
