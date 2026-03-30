import { useTranslation } from 'react-i18next';

import type { Order } from '@/entities/order';
import { useDeleteEntity } from '@/shared/model';
import { DeleteModal } from '@/shared/ui';

type DeleteOrderModalProps = {
  order: Order | null;
  onClose: () => void;
};

export function DeleteOrderModal({ order, onClose }: DeleteOrderModalProps) {
  const { mutate, isPending } = useDeleteEntity({
    item: 'orders',
    translationKey: 'ordersPage.order',
  });

  const { t } = useTranslation();

  function handleConfirm() {
    if (!order) return;
    mutate(order.id, {
      onSuccess: () => onClose(),
    });
  }

  return (
    <DeleteModal
      hasItem={!!order}
      label={t('ordersPage.order')}
      isPending={isPending}
      onClose={onClose}
      onConfirm={handleConfirm}
    />
  );
}
