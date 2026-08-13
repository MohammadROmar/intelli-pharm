import { useParams } from 'react-router';
import { useTranslation } from 'react-i18next';

import { ChangeOrderStatus } from '@/features/order-change-status';
import { QueryDisabled, QueryErrorBoundary } from '@/shared/ui';

import { OrderInfoCard } from './OrderInfoCard';
import { OrderItemsTable } from './OrderItemsTable';
import { useGetOrderSuspense } from '../model/useGetOrderSuspense';
import { useOrderDetailAccess } from '../model/useOrderDetailAccess';

export default function OrderDetailPage() {
  const { t } = useTranslation('orders', { keyPrefix: 'detail' });

  const { id } = useParams<{ id: string }>();
  const orderId = Number(id);

  if (!id || Number.isNaN(orderId)) {
    return <QueryDisabled path="/dashboard/orders" />;
  }

  return (
    <QueryErrorBoundary>
      <OrderDetailContent orderId={orderId} t={t} />
    </QueryErrorBoundary>
  );
}

type OrderDetailContentProps = { orderId: number; t: (s: string) => string };

function OrderDetailContent({ orderId, t }: OrderDetailContentProps) {
  const { data } = useGetOrderSuspense(orderId);

  const {
    canChangeStatus,
    canViewEmployee,
    canViewGift,
    canViewMedicine,
    canViewOffer,
    canViewPharmacy,
  } = useOrderDetailAccess();

  const order = data.data;

  if (!order) {
    throw new Error('Order response did not include order data.');
  }

  const pageTitle = `#${order.id} · ${t('pageTitle')} - IntelliPharma`;

  return (
    <>
      <title>{pageTitle}</title>

      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-3xl font-bold tracking-tight">
            ORD-{String(order.id).padStart(6, '0')}
          </h1>
          {canChangeStatus && <ChangeOrderStatus order={order} />}
        </div>
        <OrderInfoCard
          order={order}
          canViewPharmacy={canViewPharmacy}
          canViewEmployee={canViewEmployee}
          canViewOffer={canViewOffer}
        />
        <OrderItemsTable
          items={order.items}
          totalAmount={order.total_amount}
          totalQuantity={order.total_quantity}
          canViewMedicine={canViewMedicine}
          canViewGift={canViewGift}
          canViewOffer={canViewOffer}
        />
      </div>
    </>
  );
}
