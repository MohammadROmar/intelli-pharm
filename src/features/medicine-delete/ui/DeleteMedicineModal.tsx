import { useTranslation } from 'react-i18next';

import { useDeleteMedicine } from '../model/useDeleteMedicine';
import type { Medicine } from '@/entities/medicine';
import { DeleteModal } from '@/shared/ui';

interface DeleteMedicineModalProps {
  medicine: Medicine | null;
  onClose: () => void;
}

export function DeleteMedicineModal({
  medicine,
  onClose,
}: DeleteMedicineModalProps) {
  const { mutate, isPending } = useDeleteMedicine();

  const { t } = useTranslation();

  function handleConfirm() {
    if (!medicine) return;
    mutate(medicine.id, {
      onSuccess: () => onClose(),
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
