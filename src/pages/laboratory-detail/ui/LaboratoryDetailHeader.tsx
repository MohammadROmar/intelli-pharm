import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Pencil, Trash2 } from 'lucide-react';

import { LaboratoryEditSheet } from '@/features/laboratory-edit';
import { DeleteLaboratoryModal } from '@/features/laboratory-delete';
import type { LaboratoryDetail } from '@/entities/laboratory';
import { DropdownMenuItem, PageHeader, ActionsDropdown } from '@/shared/ui';

type Props = { laboratory: LaboratoryDetail };

export function LaboratoryDetailHeader({ laboratory }: Props) {
  const { t } = useTranslation('translation', {
    keyPrefix: 'laboratoriesPage.detail',
  });

  return (
    <PageHeader
      title={laboratory.name}
      pageTitle={`${laboratory.name} · ${t('pageTitle')} - IntelliPharma`}
    >
      <LaboratoryActions laboratory={laboratory} />
    </PageHeader>
  );
}

export function LaboratoryActions({ laboratory }: Props) {
  const { t } = useTranslation('translation', {
    keyPrefix: 'laboratoriesPage.detail',
  });
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const [isEditOpen, setIsEditOpen] = useState(
    () => searchParams.get('focus') === 'edit',
  );

  const [labToDelete, setLabToDelete] = useState<LaboratoryDetail | null>(null);

  return (
    <>
      <DeleteLaboratoryModal
        laboratory={labToDelete}
        onClose={() => setLabToDelete(null)}
        onDeleteSuccess={() => navigate('/dashboard/laboratories')}
      />

      <LaboratoryEditSheet
        id={laboratory.id}
        defaultName={laboratory.name}
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
      />

      <ActionsDropdown label={t('actions')}>
        <DropdownMenuItem
          onClick={() => setIsEditOpen(true)}
          className="cursor-pointer"
        >
          <Pencil className="mr-2 size-4" />
          {t('edit')}
        </DropdownMenuItem>

        <DropdownMenuItem
          variant="destructive"
          onClick={() => setLabToDelete(laboratory)}
          className="text-destructive hover:text-destructive hover:bg-destructive/20! w-full cursor-pointer justify-start"
        >
          <Trash2 className="mr-2 size-4" />
          {t('delete')}
        </DropdownMenuItem>
      </ActionsDropdown>
    </>
  );
}
