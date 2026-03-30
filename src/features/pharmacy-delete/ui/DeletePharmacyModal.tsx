import { useTranslation } from 'react-i18next';

import type { PharmacyDetail } from '@/entities/pharmacy';
import { useDeleteEntity } from '@/shared/model';
import { DeleteModal } from '@/shared/ui';

interface DeletePharmacyModalProps {
  pharmacy: PharmacyDetail | null;
  onClose: () => void;
  onDeleteSuccess?: () => void;
}

export function DeletePharmacyModal({
  pharmacy,
  onClose,
  onDeleteSuccess,
}: DeletePharmacyModalProps) {
  const { mutate, isPending } = useDeleteEntity({
    item: 'pharmacies',
    translationKey: 'pharmaciesPage.pharmacy',
  });

  const { t } = useTranslation();

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
      label={t('pharmaciesPage.pharmacy')}
      isPending={isPending}
      onClose={onClose}
      onConfirm={handleConfirm}
    />
  );
}
