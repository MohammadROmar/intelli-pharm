import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { DeleteMedicineModal } from '@/features/medicine-delete';
import { hasPermission, useGrantedPermissions } from '@/entities/session';
import type { Medicine, MedicineResponse } from '@/entities/medicine';
import {
  EntityEmptyState,
  EntityFiltersToolbar,
  EntityListTable,
  TableHead,
} from '@/shared/ui';

import { MedicineRow, type MedicineRowActionAccess } from './MedicineRow';
import { MedicineFiltersModal } from './MedicineFiltersModal';
import { useMedicineFilters } from '../model/useMedicineFilters';

type Props = { data: MedicineResponse };

export function MedicinesTable({ data }: Props) {
  const { t } = useTranslation('medicines');
  const grantedPermissions = useGrantedPermissions();

  const [medicineToDelete, setMedicineToDelete] = useState<Medicine | null>(
    null,
  );
  const filtersState = useMedicineFilters();

  const canCreate = hasPermission(grantedPermissions, 'erp.medicines.create');
  const canView = hasPermission(grantedPermissions, 'erp.medicines.view');
  const canUpdate = hasPermission(grantedPermissions, 'erp.medicines.update');
  const canRestock = hasPermission(grantedPermissions, 'erp.stock.update');
  const canDelete = hasPermission(grantedPermissions, 'erp.medicines.delete');

  const actionAccess = useMemo<MedicineRowActionAccess>(() => {
    return {
      canView,
      canUpdate,
      canRestock,
      canDelete,
      hasAnyRowAction: canView || canUpdate || canRestock || canDelete,
    };
  }, [canDelete, canRestock, canUpdate, canView]);

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
      {canDelete ? (
        <DeleteMedicineModal
          label={medicineToDelete?.commercial_name ?? t('medicine')}
          medicine={medicineToDelete}
          onClose={handleDeleteModalClose}
        />
      ) : null}

      <EntityListTable
        data={data}
        title={t('list.all')}
        addButton={
          canCreate
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
