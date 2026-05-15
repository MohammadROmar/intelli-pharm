import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { LaboratoryFiltersModal } from './LaboratoryFiltersModal';
import { useLaboratoryFilters } from '../model/useLaboratoryFilters';
import { AddLaboratoryButton } from '@/features/laboratory-create';
import { DeleteLaboratoryModal } from '@/features/laboratory-delete';
import {
  LaboratoryRow,
  type LaboratoriesResponse,
  type LaboratoryListItem,
} from '@/entities/laboratory';
import {
  FiltersTrigger,
  TableBody,
  TableCard,
  TableEmptyState,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui';

type Props = { data: LaboratoriesResponse };

export function LaboratoryTable({ data }: Props) {
  const { t } = useTranslation('laboratories');

  const [laboratoryToDelete, setLaboratoryToDelete] =
    useState<LaboratoryListItem | null>(null);

  const laboratories = data.data;

  return (
    <>
      <DeleteLaboratoryModal
        label={laboratoryToDelete?.name}
        laboratory={laboratoryToDelete}
        onClose={() => setLaboratoryToDelete(null)}
      />

      <TableCard
        title={t('list.all')}
        basePath="/dashboard/laboratories"
        currItemsCount={laboratories.length}
        itemsPerPage={data.meta.per_page}
        totalItems={data.meta.total}
        currentPage={data.meta.current_page}
        toolbar={
          <>
            <LaboratoryFilters />
            <AddLaboratoryButton />
          </>
        }
      >
        {laboratories.length > 0 ? (
          <>
            <TableHeader>
              <TableRow>
                <TableHead className="w-25">{t('list.id')}</TableHead>
                <TableHead>{t('list.name')}</TableHead>
                <TableHead>{t('list.actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {laboratories.map((lab) => (
                <LaboratoryRow
                  key={lab.id}
                  laboratory={lab}
                  onDelete={setLaboratoryToDelete}
                />
              ))}
            </TableBody>
          </>
        ) : (
          <EmotyState />
        )}
      </TableCard>
    </>
  );
}

function EmotyState() {
  const [searchParams, setSearchParams] = useSearchParams();
  const name = searchParams.get('name');

  return (
    <TableEmptyState
      variant={name ? 'search' : 'empty'}
      onClearSearch={() => setSearchParams({})}
    />
  );
}

function LaboratoryFilters() {
  const [open, setOpen] = useState(false);
  const { filters, applyFilters, clearFilters, activeCount, hasActiveFilters } =
    useLaboratoryFilters();

  return (
    <>
      <FiltersTrigger onClick={() => setOpen(true)} activeCount={activeCount} />
      <LaboratoryFiltersModal
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
