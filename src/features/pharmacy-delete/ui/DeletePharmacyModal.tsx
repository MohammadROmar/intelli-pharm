import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import type { Pharmacy, PharmacyDetail } from '@/entities/pharmacy';
import { useDeleteEntity } from '@/shared/model';
import { DeleteModal } from '@/shared/ui';

import { getPharmacyDeleteErrorKey } from '../lib/getPharmacyDeleteErrorKey';

type DeletePharmacyModalProps = {
  label?: string;
  pharmacy: Pharmacy | PharmacyDetail | null;
  onClose: () => void;
  onDeleteSuccess?: () => void;
};

export function DeletePharmacyModal({
  label,
  pharmacy,
  onClose,
  onDeleteSuccess,
}: DeletePharmacyModalProps) {
  const { t } = useTranslation();
  const { t: tErrors } = useTranslation('errors');

  const { mutate, isPending } = useDeleteEntity({
    item: 'pharmacies',
    translationKey: 'pharmacy',

    onError: (error) => {
      toast.error(t('toasts.delete.error'), {
        description: tErrors(getPharmacyDeleteErrorKey(error)),
      });
    },
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
      label={label}
      isPending={isPending}
      onClose={onClose}
      onConfirm={handleConfirm}
    />
  );
}
