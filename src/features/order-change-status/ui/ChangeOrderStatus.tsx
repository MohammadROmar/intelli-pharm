import type { OrderDetail, OrderStatus } from '@/entities/order';
import { ChangeOrderStatusDialog } from './ChangeOrderStatusDialog';
import { useChangeOrderStatus } from '../model/useChangeOrderStatus';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

type Props = { order: OrderDetail };

export function ChangeOrderStatus({ order }: Props) {
  const { mutateAsync, isPending } = useChangeOrderStatus();
  const [searchParams] = useSearchParams();

  const [isOpen, setIsOpen] = useState(
    () => searchParams.get('focus') === 'change-status',
  );

  async function onSubmit(status: OrderStatus) {
    return mutateAsync(
      { id: order.id, status },
      { onSuccess: () => setIsOpen(false) },
    );
  }

  return (
    <ChangeOrderStatusDialog
      currentStatus={order.status}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      onSubmit={onSubmit}
      isPending={isPending}
    />
  );
}
