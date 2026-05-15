import type { Offer } from '@/entities/offer';
import { useDeleteEntity } from '@/shared/model';
import { DeleteModal } from '@/shared/ui';
import { useTranslation } from 'react-i18next';

type DeleteOfferModalProps = {
  offer: Offer | null;
  onClose: () => void;
  onDeleteSuccess?: () => void;
};

export function DeleteOfferModal({
  offer,
  onClose,
  onDeleteSuccess,
}: DeleteOfferModalProps) {
  const { mutate, isPending } = useDeleteEntity({
    item: 'offers',
    translationKey: 'offer',
  });

  const { t } = useTranslation('offers');

  function handleConfirm() {
    if (!offer) return;

    mutate(offer.id, {
      onSuccess: () => {
        onClose();
        onDeleteSuccess?.();
      },
    });
  }

  return (
    <DeleteModal
      hasItem={!!offer}
      label={t('offer')}
      isPending={isPending}
      onClose={onClose}
      onConfirm={handleConfirm}
    />
  );
}
