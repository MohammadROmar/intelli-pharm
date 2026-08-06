import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { DeletePharmacyModal } from '@/features/pharmacy-delete';
import { usePharmacyFilters } from '@/entities/pharmacy';
import { hasPermission, useGrantedPermissions } from '@/entities/session';
import type { PharmaciesResponse, Pharmacy } from '@/entities/pharmacy';
import {
  EntityEmptyState,
  EntityFiltersToolbar,
  EntityListTable,
  TableHead,
} from '@/shared/ui';

import { PharmacyRow, type PharmacyRowActionAccess } from './PharmacyRow';
import { PharmacyFiltersModal } from './PharmacyFiltersModal';

type Props = { data: PharmaciesResponse };

export function PharmaciesTable({ data }: Props) {
  const { t } = useTranslation('pharmacies');
  const grantedPermissions = useGrantedPermissions();

  const [pharmacyToDelete, setPharmacyToDelete] = useState<Pharmacy | null>(
    null,
  );

  const filtersState = usePharmacyFilters();

  const canCreate = hasPermission(grantedPermissions, 'erp.pharmacies.create');
  const canView = hasPermission(grantedPermissions, 'erp.pharmacies.view');
  const canUpdate = hasPermission(grantedPermissions, 'erp.pharmacies.update');
  const canDelete = hasPermission(grantedPermissions, 'erp.pharmacies.delete');

  const actionAccess = useMemo<PharmacyRowActionAccess>(
    () => ({
      canView,
      canUpdate,
      canDelete,
      hasAnyRowAction: canView || canUpdate || canDelete,
    }),
    [canDelete, canUpdate, canView],
  );

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
      {canDelete ? (
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
          canCreate
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
            {actionAccess.hasAnyRowAction ? (
              <TableHead>{t('list.actions')}</TableHead>
            ) : null}
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
