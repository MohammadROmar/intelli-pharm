import type { Medicine, MedicineDetail } from '@/entities/medicine';
import { useDeleteEntity } from '@/shared/model';
import { DeleteModal } from '@/shared/ui';

type DeleteMedicineModalProps = {
  label: string;
  medicine: Medicine | MedicineDetail | null;
  onClose: () => void;
  onDeleteSuccess?: () => void;
};

export function DeleteMedicineModal({
  label,
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
      label={label}
      isPending={isPending}
      onClose={onClose}
      onConfirm={handleConfirm}
    />
  );
}
