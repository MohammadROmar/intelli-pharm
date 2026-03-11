import { useTranslation } from 'react-i18next';

import { useDeleteOrder } from '../model/useDeleteOrder';
import type { Order } from '@/entities/order';
import { DeleteModal } from '@/shared/ui/DeleteModal';

interface DeleteOrderModalProps {
  order: Order | null;
  onClose: () => void;
}

export function DeleteOrderModal({ order, onClose }: DeleteOrderModalProps) {
  const { mutate, isPending } = useDeleteOrder();

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
