import { useTranslation } from 'react-i18next';

import type { Gift } from '@/entities/gift';
import { getLocalized } from '@/shared/lib';
import { useDeleteEntity } from '@/shared/model';
import { DeleteModal } from '@/shared/ui';

type DeleteGiftModalProps = {
  gift: Gift | null;
  onClose: () => void;
  onDeleteSuccess?: () => void;
};

export function DeleteGiftModal({
  gift,
  onClose,
  onDeleteSuccess,
}: DeleteGiftModalProps) {
  const { mutate, isPending } = useDeleteEntity({
    item: 'gifts',
    translationKey: 'gift',
  });

  const { t, i18n } = useTranslation('gifts', { keyPrefix: 'delete' });

  function handleConfirm() {
    if (!gift) return;

    mutate(gift.id, {
      onSuccess: () => {
        onClose();
        onDeleteSuccess?.();
      },
    });
  }

  const name = gift
    ? getLocalized(gift.medicine.commercial_name, i18n.language)
    : '';

  return (
    <DeleteModal
      hasItem={!!gift}
      label={t('label', { medicine: name })}
      isPending={isPending}
      onClose={onClose}
      onConfirm={handleConfirm}
    />
  );
}
