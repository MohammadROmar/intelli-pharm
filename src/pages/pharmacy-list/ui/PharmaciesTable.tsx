import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { PharmacyFiltersModal } from './PharmacyFiltersModal';
import { usePharmacyFilters } from '../model/usePharmacyFilters';
import { DeletePharmacyModal } from '@/features/pharmacy-delete';
import { PharmacyRow } from '@/entities/pharmacy';
import type { PharmaciesResponse, Pharmacy } from '@/entities/pharmacy';
import {
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCard,
  TableEmptyState,
  FiltersTrigger,
} from '@/shared/ui';

type Props = { data: PharmaciesResponse };

export function PharmaciesTable({ data }: Props) {
  const { t } = useTranslation('pharmacies');

  const [pharmacyToDelete, setPharmacyToDelete] = useState<Pharmacy | null>(
    null,
  );

  const pharmacies = data.data;

  return (
    <>
      <DeletePharmacyModal
        label={pharmacyToDelete?.name}
        pharmacy={pharmacyToDelete}
        onClose={() => setPharmacyToDelete(null)}
      />
      <TableCard
        title={t('list.all')}
        toolbar={<PharmacyFilters />}
        addHref="/dashboard/pharmacies/new"
        addLabel={t('list.add')}
        currItemsCount={pharmacies.length}
        basePath="/dashboard/pharmacies"
        currentPage={data.meta.current_page}
        totalItems={data.meta.total}
        itemsPerPage={data.meta.per_page}
      >
        {pharmacies.length > 0 ? (
          <>
            <TableHeader>
              <TableRow>
                <TableHead className="w-25">{t('list.id')}</TableHead>
                <TableHead>{t('list.name')}</TableHead>
                <TableHead>{t('list.region')}</TableHead>
                <TableHead>{t('list.pharmacistName')}</TableHead>
                <TableHead>{t('list.pharmacistNumber')}</TableHead>
                <TableHead>{t('list.status')}</TableHead>
                <TableHead>{t('list.actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pharmacies.map((pharmacy) => (
                <PharmacyRow
                  key={pharmacy.id}
                  pharmacy={pharmacy}
                  onDelete={setPharmacyToDelete}
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

function PharmacyFilters() {
  const [open, setOpen] = useState(false);
  const { filters, applyFilters, clearFilters, activeCount, hasActiveFilters } =
    usePharmacyFilters();

  return (
    <>
      <FiltersTrigger onClick={() => setOpen(true)} activeCount={activeCount} />
      <PharmacyFiltersModal
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
  const { hasActiveFilters, clearFilters } = usePharmacyFilters();

  return (
    <TableEmptyState
      variant={hasActiveFilters ? 'search' : 'empty'}
      onClearSearch={clearFilters}
    />
  );
}
