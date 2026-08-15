import { useTranslation } from 'react-i18next';
import { Package } from 'lucide-react';

import { CancelOrder } from '@/features/order-cancel';
import { ChangeOrderStatus } from '@/features/order-change-status';
import { OrderStatusBadge, type OrderDetail } from '@/entities/order';

type Props = {
  order: OrderDetail;
  canCancel: boolean;
  canChangeStatus: boolean;
};

export function OrderDetailHeader({
  order,
  canCancel,
  canChangeStatus,
}: Props) {
  const { t } = useTranslation('order-detail', { keyPrefix: 'detail.header' });

  const orderCode = `ORD-${String(order.id).padStart(6, '0')}`;

  const isTerminalStatus =
    order.status === 'completed' || order.status === 'cancelled';

  const canChangeOrderStatus = canChangeStatus && !isTerminalStatus;
  const canCancelOrder = canCancel && !isTerminalStatus;
  const hasAvailableAction = canChangeOrderStatus || canCancelOrder;

  return (
    <header className="bg-card relative overflow-hidden rounded-2xl border p-5 shadow-sm sm:p-6">
      <div
        className="bg-primary/5 pointer-events-none absolute -end-12 -top-16 size-40 rounded-full"
        aria-hidden="true"
      />

      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex min-w-0 items-start gap-4">
          <div className="bg-primary/10 text-primary hidden size-12 shrink-0 items-center justify-center rounded-xl border sm:flex">
            <Package className="size-6" aria-hidden="true" />
          </div>

          <div className="min-w-0 space-y-3">
            <div>
              <p className="text-muted-foreground mb-1 text-xs font-semibold tracking-[0.16em] uppercase">
                {t('recordLabel')}
              </p>

              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                {orderCode}
              </h1>

              <p className="text-muted-foreground mt-1 text-sm">
                {t('pharmacyContext', {
                  pharmacy: order.pharmacy.name,
                })}
              </p>
            </div>

            <OrderStatusBadge status={order.status} />
          </div>
        </div>

        {hasAvailableAction ? (
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            {canChangeOrderStatus ? <ChangeOrderStatus order={order} /> : null}

            {canCancelOrder ? (
              <CancelOrder orderId={order.id} currentStatus={order.status} />
            ) : null}
          </div>
        ) : null}
      </div>
    </header>
  );
}
