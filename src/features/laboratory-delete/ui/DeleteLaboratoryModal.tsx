import { useTranslation } from 'react-i18next';

import { useDeleteLaboratory } from '../model/useDeleteLaboratory';
import type { LaboratoryListItem } from '@/entities/laboratory';
import { DeleteModal } from '@/shared/ui/DeleteModal';

interface DeleteLaboratoryModalProps {
  laboratory: LaboratoryListItem | null;
  onClose: () => void;
}

export function DeleteLaboratoryModal({
  laboratory,
  onClose,
}: DeleteLaboratoryModalProps) {
  const { mutate, isPending } = useDeleteLaboratory();

  const { t } = useTranslation();

  function handleConfirm() {
    if (!laboratory) return;
    mutate(laboratory.id, {
      onSuccess: () => onClose(),
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
