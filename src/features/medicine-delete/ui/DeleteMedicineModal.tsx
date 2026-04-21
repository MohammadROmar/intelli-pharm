import type { Medicine } from '@/entities/medicine';
import { useDeleteEntity } from '@/shared/model';
import { DeleteModal } from '@/shared/ui';

type DeleteMedicineModalProps = {
  medicine: Medicine | null;
  onClose: () => void;
  onDeleteSuccess?: () => void;
};

export function DeleteMedicineModal({
  medicine,
  onClose,
  onDeleteSuccess,
}: DeleteMedicineModalProps) {
  const { mutate, isPending } = useDeleteEntity({
    item: 'medicines',
    translationKey: 'medicinesPage.medicine',
  });

  function handleConfirm() {
    if (!medicine) return;

    mutate(medicine.id, {
      onSuccess: () => {
        onClose();
        onDeleteSuccess?.();
      },
    });
  }

  return (
    <DeleteModal
      hasItem={!!medicine}
      label={medicine?.commercial_name}
      isPending={isPending}
      onClose={onClose}
      onConfirm={handleConfirm}
    />
  );
}
