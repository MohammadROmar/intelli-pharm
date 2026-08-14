import { useCallback, useState } from 'react';
import { useSearchParams } from 'react-router';

import { CancelOrderDialog } from './CancelOrderDialog';
import { useCancelOrder } from '../model/useCancelOrder';
import type { OrderStatus } from '@/entities/order';

type Props = {
  orderId: number;
  currentStatus: OrderStatus;
};

export function CancelOrder({ orderId, currentStatus }: Props) {
  const [searchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState(
    () => searchParams.get('focus') === 'cancel-order',
  );
  const { mutate, isPending } = useCancelOrder();

  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (!isPending) setIsOpen(open);
    },
    [isPending],
  );

  const handleSuccess = useCallback(() => setIsOpen(false), []);

  const handleConfirm = useCallback(() => {
    mutate({ id: orderId }, { onSuccess: handleSuccess });
  }, [handleSuccess, mutate, orderId]);

  return (
    <CancelOrderDialog
      orderId={orderId}
      currentStatus={currentStatus}
      isOpen={isOpen}
      isPending={isPending}
      onOpenChange={handleOpenChange}
      onConfirm={handleConfirm}
    />
  );
}
