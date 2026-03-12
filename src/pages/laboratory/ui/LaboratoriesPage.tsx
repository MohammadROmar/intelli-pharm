import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { DeleteLaboratoryModal } from '@/features/laboratory-delete';
import { AddLaboratoryButton } from '@/features/laboratory-create';
import { LaboratoryRow, type LaboratoryListItem } from '@/entities/laboratory';
import {
  PageTitle,
  TableBody,
  TableCard,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui';
import { dummyLaboratories } from '@/entities/laboratory/model/dummyLaboratories';

export default function LaboratoriesPage() {
  const { t } = useTranslation('translation', {
    keyPrefix: 'laboratoriesPage',
  });

  const [searchParams] = useSearchParams();
  const page = searchParams.get('page');

  const [laboratoryToDelete, setLaboratoryToDelete] =
    useState<LaboratoryListItem | null>(null);

  return (
    <>
      <DeleteLaboratoryModal
        laboratory={laboratoryToDelete}
        onClose={() => setLaboratoryToDelete(null)}
      />

      <div className="flex items-center justify-between gap-4">
        <PageTitle title={t('list.title')} subtitle={t('list.subtitle')} />
        <AddLaboratoryButton />
      </div>

      <TableCard
        title={t('list.all')}
        basePath="/dashboard/laboratories"
        currentPage={+(page ?? 1)}
        maxPages={20}
        totalItems={200}
      >
        <TableHeader>
          <TableRow>
            <TableHead className="w-25">{t('list.id')}</TableHead>
            <TableHead>{t('list.name')}</TableHead>
            <TableHead>{t('list.actions')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dummyLaboratories.map((lab) => (
            <LaboratoryRow
              key={lab.id}
              laboratory={lab}
              onDelete={setLaboratoryToDelete}
            />
          ))}
        </TableBody>
      </TableCard>
    </>
  );
}
