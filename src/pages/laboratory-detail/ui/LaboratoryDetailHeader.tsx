import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Pencil, Trash2 } from 'lucide-react';

import { LaboratoryEditSheet } from '@/features/laboratory-edit';
import { DeleteLaboratoryModal } from '@/features/laboratory-delete';
import type { LaboratoryDetail } from '@/entities/laboratory';
import { getLocalized } from '@/shared/lib';
import { DropdownMenuItem, PageHeader, ActionsDropdown } from '@/shared/ui';
import { useLaboratoryAccess } from '@/features/laboratory-access';

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

  const { canUpdate, canDelete } = useLaboratoryAccess();
  const hasAnyAction = canUpdate || canDelete;

  return (
    <>
      {canDelete && (
        <DeleteLaboratoryModal
          label={name}
          laboratory={labToDelete}
          onClose={() => setLabToDelete(null)}
          onDeleteSuccess={() => navigate('/dashboard/laboratories')}
        />
      )}

      {canUpdate && (
        <LaboratoryEditSheet
          id={laboratory.id}
          defaultName={laboratory.name}
          open={isEditOpen}
          onOpenChange={setIsEditOpen}
        />
      )}

      {hasAnyAction && (
        <ActionsDropdown label={t('actions')}>
          {canUpdate && (
            <DropdownMenuItem
              onSelect={() => setIsEditOpen(true)}
              className="cursor-pointer"
            >
              <Pencil className="size-4" />
              {t('edit')}
            </DropdownMenuItem>
          )}

          {canDelete && (
            <DropdownMenuItem
              variant="destructive"
              onSelect={() => setLabToDelete(laboratory)}
              className="text-destructive hover:text-destructive hover:bg-destructive/20! w-full cursor-pointer justify-start"
            >
              <Trash2 className="size-4" />
              {t('delete')}
            </DropdownMenuItem>
          )}
        </ActionsDropdown>
      )}
    </>
  );
}
