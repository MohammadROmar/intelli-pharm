import { useTranslation } from 'react-i18next';

import type { LaboratoryListItem } from '@/entities/laboratory';
import { useDeleteEntity } from '@/shared/model';
import { DeleteModal } from '@/shared/ui';

type DeleteLaboratoryModalProps = {
  laboratory: LaboratoryListItem | null;
  onClose: () => void;
  onDeleteSuccess?: () => void;
};

export function DeleteLaboratoryModal({
  laboratory,
  onClose,
  onDeleteSuccess,
}: DeleteLaboratoryModalProps) {
  const { mutate, isPending } = useDeleteEntity({
    item: 'laboratories',
    translationKey: 'laboratoriesPage.laboratory',
  });

  const { t } = useTranslation();

  function handleConfirm() {
    if (!laboratory) return;
    mutate(laboratory.id, {
      onSuccess: () => {
        onClose();
        onDeleteSuccess?.();
      },
    });
  }

  return (
    <DeleteModal
      hasItem={!!laboratory}
      label={t('laboratoriesPage.laboratory')}
      isPending={isPending}
      onClose={onClose}
      onConfirm={handleConfirm}
    />
  );
}
