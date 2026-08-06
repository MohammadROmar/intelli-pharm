import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { usePharmacyAccess } from '@/features/pharmacy-access';
import { DeletePharmacyModal } from '@/features/pharmacy-delete';
import { usePharmacyFilters } from '@/entities/pharmacy';
import type { PharmaciesResponse, Pharmacy } from '@/entities/pharmacy';
import {
  EntityEmptyState,
  EntityFiltersToolbar,
  EntityListTable,
  TableHead,
} from '@/shared/ui';

import { PharmacyRow } from './PharmacyRow';
import { PharmacyFiltersModal } from './PharmacyFiltersModal';

type Props = { data: PharmaciesResponse };

export function PharmaciesTable({ data }: Props) {
  const { t } = useTranslation('pharmacies');

  const [pharmacyToDelete, setPharmacyToDelete] = useState<Pharmacy | null>(
    null,
  );

  const filtersState = usePharmacyFilters();

  const actionAccess = usePharmacyAccess();

  const handleDeleteClose = useCallback(() => setPharmacyToDelete(null), []);

  const renderRow = useCallback(
    (pharmacy: Pharmacy) => (
      <PharmacyRow
        key={pharmacy.id}
        pharmacy={pharmacy}
        actionAccess={actionAccess}
        onDelete={setPharmacyToDelete}
      />
    ),
    [actionAccess],
  );

  return (
    <>
      {actionAccess.canDelete ? (
        <DeletePharmacyModal
          label={pharmacyToDelete?.name}
          pharmacy={pharmacyToDelete}
          onClose={handleDeleteClose}
        />
      ) : null}
      <EntityListTable
        data={data}
        title={t('list.all')}
        addButton={
          actionAccess.canCreate
            ? {
                addHref: '/dashboard/pharmacies/new',
                addLabel: t('list.add'),
              }
            : undefined
        }
        basePath="/dashboard/pharmacies"
        toolbar={
          <EntityFiltersToolbar
            filtersState={filtersState}
            FiltersModal={PharmacyFiltersModal}
          />
        }
        columns={
          <>
            <TableHead>{t('list.name')}</TableHead>
            <TableHead>{t('list.region')}</TableHead>
            <TableHead>{t('list.pharmacistName')}</TableHead>
            <TableHead>{t('list.pharmacistNumber')}</TableHead>
            <TableHead>{t('list.status')}</TableHead>
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
