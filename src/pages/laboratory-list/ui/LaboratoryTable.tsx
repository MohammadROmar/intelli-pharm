import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useLaboratoryAccess } from '@/features/laboratory-access';
import { AddLaboratoryButton } from '@/features/laboratory-create';
import { DeleteLaboratoryModal } from '@/features/laboratory-delete';
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

import { LaboratoryRow } from './LaboratoryRow';
import { LaboratoryFiltersModal } from './LaboratoryFiltersModal';
import { useLaboratoryFilters } from '../model/useLaboratoryFilters';

type Props = { data: LaboratoriesResponse };

export function LaboratoryTable({ data }: Props) {
  const { t } = useTranslation('laboratories');

  const [laboratoryToDelete, setLaboratoryToDelete] =
    useState<LaboratoryListItem | null>(null);
  const filtersState = useLaboratoryFilters();

  const actionAccess = useLaboratoryAccess();

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
      {actionAccess.canDelete ? (
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
            {actionAccess.canCreate ? <AddLaboratoryButton /> : null}
          </>
        }
        columns={
          <>
            <TableHead>{t('list.name')}</TableHead>
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
