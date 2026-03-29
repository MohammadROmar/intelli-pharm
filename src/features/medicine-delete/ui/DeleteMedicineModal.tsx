import { useTranslation } from 'react-i18next';

import type { Medicine } from '@/entities/medicine';
import { useDeleteEntity } from '@/shared/model';
import { DeleteModal } from '@/shared/ui';

interface DeleteMedicineModalProps {
  medicine: Medicine | null;
  onClose: () => void;
  onDeleteSuccess?: () => void;
}

export function DeleteMedicineModal({
  medicine,
  onClose,
  onDeleteSuccess,
}: DeleteMedicineModalProps) {
  const { mutate, isPending } = useDeleteEntity({
    item: 'medicines',
    translationKey: 'medicinesPage.medicine',
  });

  const { t } = useTranslation();

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
      label={t('medicinesPage.medicine')}
      isPending={isPending}
      onClose={onClose}
      onConfirm={handleConfirm}
    />
  );
}
