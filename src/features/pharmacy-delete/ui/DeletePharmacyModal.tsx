import type { PharmacyDetail } from '@/entities/pharmacy';
import { useDeleteEntity } from '@/shared/model';
import { DeleteModal } from '@/shared/ui';

type DeletePharmacyModalProps = {
  pharmacy: PharmacyDetail | null;
  onClose: () => void;
  onDeleteSuccess?: () => void;
};

export function DeletePharmacyModal({
  pharmacy,
  onClose,
  onDeleteSuccess,
}: DeletePharmacyModalProps) {
  const { mutate, isPending } = useDeleteEntity({
    item: 'pharmacies',
    translationKey: 'pharmaciesPage.pharmacy',
  });

  function handleConfirm() {
    if (!pharmacy) return;

    mutate(pharmacy.id, {
      onSuccess: () => {
        onClose();
        onDeleteSuccess?.();
      },
    });
  }

  return (
    <DeleteModal
      hasItem={!!pharmacy}
      label={pharmacy?.name}
      isPending={isPending}
      onClose={onClose}
      onConfirm={handleConfirm}
    />
  );
}
