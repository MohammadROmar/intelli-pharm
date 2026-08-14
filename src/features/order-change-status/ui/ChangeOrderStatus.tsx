import { useCallback, useState } from 'react';
import { useSearchParams } from 'react-router';

import { ChangeOrderStatusDialog } from './ChangeOrderStatusDialog';
import { useChangeOrderStatus } from '../model/useChangeOrderStatus';
import type { OrderDetail, OrderStatus } from '@/entities/order';

type Props = { order: OrderDetail };

export function ChangeOrderStatus({ order }: Props) {
  const { mutateAsync, isPending } = useChangeOrderStatus();
  const [searchParams] = useSearchParams();

  const [isOpen, setIsOpen] = useState(
    () => searchParams.get('focus') === 'change-status',
  );

  const handleSuccess = useCallback(() => setIsOpen(false), []);

  const handleSubmit = useCallback(
    (status: OrderStatus) =>
      mutateAsync({ id: order.id, status }, { onSuccess: handleSuccess }),
    [handleSuccess, mutateAsync, order.id],
  );

  return (
    <ChangeOrderStatusDialog
      currentStatus={order.status}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      onSubmit={handleSubmit}
      isPending={isPending}
    />
  );
}
