import type { Gift } from '@/entities/gift';
import { useDeleteEntity } from '@/shared/model';
import { DeleteModal } from '@/shared/ui';
import { useTranslation } from 'react-i18next';

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
    translationKey: 'giftsPage.gift',
  });

  const { t } = useTranslation('translation', {
    keyPrefix: 'giftsPage.delete',
  });

  function handleConfirm() {
    if (!gift) return;

    mutate(gift.id, {
      onSuccess: () => {
        onClose();
        onDeleteSuccess?.();
      },
    });
  }

  return (
    <DeleteModal
      hasItem={!!gift}
      label={t('label', { medicine: gift?.medicine.commercial_name.en || '' })}
      isPending={isPending}
      onClose={onClose}
      onConfirm={handleConfirm}
    />
  );
}
