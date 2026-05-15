import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { MedicineFiltersModal } from './MedicineFiltersModal';
import { useMedicineFilters } from '../model/useMedicineFilters';
import { DeleteMedicineModal } from '@/features/medicine-delete';
import { MedicineRow } from '@/entities/medicine';
import type { Medicine, MedicineResponse } from '@/entities/medicine';
import {
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCard,
  TableEmptyState,
  FiltersTrigger,
} from '@/shared/ui';

type Props = { data: MedicineResponse };

export function MedicinesTable({ data }: Props) {
  const { t } = useTranslation('medicines');

  const [medicineToDelete, setMedicineToDelete] = useState<Medicine | null>(
    null,
  );

  const medicines = data.data;

  return (
    <>
      <DeleteMedicineModal
        label={medicineToDelete?.commercial_name || t('medicine')}
        medicine={medicineToDelete}
        onClose={() => setMedicineToDelete(null)}
      />
      <TableCard
        title={t('list.all')}
        toolbar={<MedicineFilters />}
        addHref="/dashboard/medicines/new"
        addLabel={t('list.add')}
        currItemsCount={medicines.length}
        basePath="/dashboard/medicines"
        currentPage={data.meta.current_page}
        totalItems={data.meta.total}
        itemsPerPage={data.meta.per_page}
      >
        {medicines.length > 0 ? (
          <>
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
              {medicines.map((medicine) => (
                <MedicineRow
                  key={medicine.id}
                  medicine={medicine}
                  onDelete={setMedicineToDelete}
                />
              ))}
            </TableBody>
          </>
        ) : (
          <EmptyState />
        )}
      </TableCard>
    </>
  );
}

function MedicineFilters() {
  const [open, setOpen] = useState(false);
  const { filters, applyFilters, clearFilters, activeCount, hasActiveFilters } =
    useMedicineFilters();

  return (
    <>
      <FiltersTrigger onClick={() => setOpen(true)} activeCount={activeCount} />
      <MedicineFiltersModal
        open={open}
        onOpenChange={setOpen}
        defaultValues={filters}
        hasActiveFilters={hasActiveFilters}
        onApply={(v) => {
          applyFilters(v);
          setOpen(false);
        }}
        onClear={() => {
          clearFilters();
          setOpen(false);
        }}
      />
    </>
  );
}

function EmptyState() {
  const { hasActiveFilters, clearFilters } = useMedicineFilters();

  return (
    <TableEmptyState
      variant={hasActiveFilters ? 'search' : 'empty'}
      onClearSearch={clearFilters}
    />
  );
}
