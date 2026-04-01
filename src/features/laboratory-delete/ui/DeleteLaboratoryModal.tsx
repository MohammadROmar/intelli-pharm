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
      label={laboratory?.name}
      isPending={isPending}
      onClose={onClose}
      onConfirm={handleConfirm}
    />
  );
}
