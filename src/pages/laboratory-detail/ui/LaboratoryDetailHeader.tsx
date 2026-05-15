import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Pencil, Trash2 } from 'lucide-react';

import { LaboratoryEditSheet } from '@/features/laboratory-edit';
import { DeleteLaboratoryModal } from '@/features/laboratory-delete';
import type { LaboratoryDetail } from '@/entities/laboratory';
import { getLocalized } from '@/shared/lib';
import { DropdownMenuItem, PageHeader, ActionsDropdown } from '@/shared/ui';

type Props = { laboratory: LaboratoryDetail };

export function LaboratoryDetailHeader({ laboratory }: Props) {
  const { t, i18n } = useTranslation('laboratories', {
    keyPrefix: 'detail',
  });

  const name = getLocalized(laboratory.name, i18n.language);

  return (
    <PageHeader
      title={name}
      pageTitle={`${name} · ${t('pageTitle')} - IntelliPharma`}
    >
      <LaboratoryActions laboratory={laboratory} name={name} />
    </PageHeader>
  );
}

export function LaboratoryActions({
  name,
  laboratory,
}: Props & { name: string }) {
  const { t } = useTranslation('laboratories', {
    keyPrefix: 'detail',
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
        label={name}
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
          <Pencil className="size-4" />
          {t('edit')}
        </DropdownMenuItem>

        <DropdownMenuItem
          variant="destructive"
          onClick={() => setLabToDelete(laboratory)}
          className="text-destructive hover:text-destructive hover:bg-destructive/20! w-full cursor-pointer justify-start"
        >
          <Trash2 className="size-4" />
          {t('delete')}
        </DropdownMenuItem>
      </ActionsDropdown>
    </>
  );
}
