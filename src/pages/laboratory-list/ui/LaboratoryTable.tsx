import { useState } from 'react';
import { useTranslation } from 'react-i18next';

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

  return (
    <>
      <DeleteLaboratoryModal
        label={laboratoryToDelete?.name}
        laboratory={laboratoryToDelete}
        onClose={() => setLaboratoryToDelete(null)}
      />

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
            <AddLaboratoryButton />
          </>
        }
        columns={
          <>
            <TableHead className="w-25">{t('list.id')}</TableHead>
            <TableHead>{t('list.name')}</TableHead>
            <TableHead>{t('list.actions')}</TableHead>
          </>
        }
        renderRow={(lab) => (
          <LaboratoryRow
            key={lab.id}
            laboratory={lab}
            onDelete={setLaboratoryToDelete}
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
