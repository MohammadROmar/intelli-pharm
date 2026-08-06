import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { AddLaboratoryButton } from '@/features/laboratory-create';
import { DeleteLaboratoryModal } from '@/features/laboratory-delete';
import { hasPermission, useGrantedPermissions } from '@/entities/session';
import type {
  LaboratoryListItem,
  LaboratoriesResponse,
} from '@/entities/laboratory';
import {
  EntityEmptyState,
  EntityFiltersToolbar,
  EntityListTable,
  TableHead,
} from '@/shared/ui';

import { LaboratoryRow, type LaboratoryRowActionAccess } from './LaboratoryRow';
import { LaboratoryFiltersModal } from './LaboratoryFiltersModal';
import { useLaboratoryFilters } from '../model/useLaboratoryFilters';

type Props = { data: LaboratoriesResponse };

export function LaboratoryTable({ data }: Props) {
  const { t } = useTranslation('laboratories');
  const grantedPermissions = useGrantedPermissions();

  const [laboratoryToDelete, setLaboratoryToDelete] =
    useState<LaboratoryListItem | null>(null);
  const filtersState = useLaboratoryFilters();

  const canCreate = hasPermission(
    grantedPermissions,
    'erp.laboratories.create',
  );
  const canView = hasPermission(grantedPermissions, 'erp.laboratories.view');
  const canUpdate = hasPermission(
    grantedPermissions,
    'erp.laboratories.update',
  );
  const canDelete = hasPermission(
    grantedPermissions,
    'erp.laboratories.delete',
  );

  const actionAccess = useMemo<LaboratoryRowActionAccess>(
    () => ({
      canView,
      canUpdate,
      canDelete,
      hasAnyRowAction: canView || canUpdate || canDelete,
    }),
    [canDelete, canUpdate, canView],
  );

  const handleDeleteModalClose = useCallback(() => {
    setLaboratoryToDelete(null);
  }, []);

  const renderRow = useCallback(
    (lab: LaboratoryListItem) => (
      <LaboratoryRow
        key={lab.id}
        laboratory={lab}
        actionAccess={actionAccess}
        onDelete={setLaboratoryToDelete}
      />
    ),
    [actionAccess],
  );

  return (
    <>
      {canDelete ? (
        <DeleteLaboratoryModal
          label={laboratoryToDelete?.name}
          laboratory={laboratoryToDelete}
          onClose={handleDeleteModalClose}
        />
      ) : null}

      <EntityListTable
        data={data}
        title={t('list.all')}
        basePath="/dashboard/laboratories"
        toolbar={
          <>
            <EntityFiltersToolbar
              filtersState={filtersState}
              FiltersModal={LaboratoryFiltersModal}
            />
            {canCreate ? <AddLaboratoryButton /> : null}
          </>
        }
        columns={
          <>
            <TableHead>{t('list.name')}</TableHead>
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
