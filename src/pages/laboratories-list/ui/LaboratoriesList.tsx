import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { AddLaboratoryButton } from '@/features/laboratory-create';
import { DeleteLaboratoryModal } from '@/features/laboratory-delete';
import {
  LaboratoryRow,
  type LaboratoriesResponse,
  type LaboratoryListItem,
} from '@/entities/laboratory';
import {
  SearchField,
  TableBody,
  TableCard,
  TableEmptyState,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui';

type Props = { data: LaboratoriesResponse };

export function LaboratoriesTable({ data }: Props) {
  const { t } = useTranslation('translation', {
    keyPrefix: 'laboratoriesPage',
  });

  const [laboratoryToDelete, setLaboratoryToDelete] =
    useState<LaboratoryListItem | null>(null);

  const labs = data.data!;

  return (
    <>
      <DeleteLaboratoryModal
        laboratory={laboratoryToDelete}
        onClose={() => setLaboratoryToDelete(null)}
      />

      <TableCard
        title={t('list.all')}
        basePath="/dashboard/laboratories"
        itemsPerPage={10}
        header={
          <div className="flex w-full flex-col gap-2 lg:w-fit lg:flex-row lg:items-center">
            <SearchField placeholder={t('list.searchPlaceholder')} />
            <AddLaboratoryButton />
          </div>
        }
        currentPage={data.current_page}
        totalItems={data.total}
      >
        {labs.length > 0 ? (
          <>
            <TableHeader>
              <TableRow>
                <TableHead className="w-25">{t('list.id')}</TableHead>
                <TableHead>{t('list.name')}</TableHead>
                <TableHead>{t('list.createdAt')}</TableHead>
                <TableHead>{t('list.actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {labs.map((lab) => (
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
      onClearSearch={() => {
        setSearchParams(() => new URLSearchParams(), { replace: true });
      }}
    />
  );
}
