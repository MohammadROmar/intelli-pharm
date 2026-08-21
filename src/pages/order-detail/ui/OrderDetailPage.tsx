import { useParams } from 'react-router';
import { useTranslation } from 'react-i18next';

import { useGetOrderSuspense } from '@/entities/order';
import { QueryDisabled, QueryErrorBoundary } from '@/shared/ui';

import { OrderInfoCard } from './OrderInfoCard';
import { OrderDetailHeader } from './OrderDetailHeader';
import { OrderItemsTable } from './OrderItemsTable';
import { OrderSummaryStrip } from './OrderSummaryStrip';
import { OrderFinancialSummary } from './OrderFinancialSummary';
import { useOrderDetailAccess } from '../model/useOrderDetailAccess';

export default function OrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const orderId = Number(id);

  if (!id || Number.isNaN(orderId)) {
    return <QueryDisabled path="/dashboard/orders" />;
  }

  return (
    <QueryErrorBoundary>
      <OrderDetailContent orderId={orderId} />
    </QueryErrorBoundary>
  );
}

type OrderDetailContentProps = { orderId: number };

function OrderDetailContent({ orderId }: OrderDetailContentProps) {
  const { t } = useTranslation('order-detail', { keyPrefix: 'detail' });
  const { data } = useGetOrderSuspense(orderId);
  const access = useOrderDetailAccess();
  const order = data.data;

  if (!order) {
    throw new Error('Order response did not include order data.');
  }

  const orderCode = `ORD-${String(order.id).padStart(6, '0')}`;

  return (
    <>
      <title>{`${orderCode} · ${t('pageTitle')} - IntelliPharm`}</title>

      <div className="space-y-5 pb-8">
        <OrderDetailHeader
          order={order}
          canCancel={access.canCancel}
          canChangeStatus={access.canChangeStatus}
        />
        <OrderSummaryStrip
          order={order}
          canViewPharmacy={access.canViewPharmacy}
        />

        <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_22rem] xl:items-start">
          <aside className="space-y-5 xl:col-start-2 xl:row-start-1">
            <OrderFinancialSummary order={order} />
            <OrderInfoCard
              order={order}
              canViewEmployee={access.canViewEmployee}
              canViewOffer={access.canViewOffer}
            />
          </aside>

          <main className="min-w-0 xl:col-start-1 xl:row-start-1">
            <OrderItemsTable
              items={order.items}
              finalTotal={order.final_total}
              totalQuantity={order.total_quantity}
              canViewMedicine={access.canViewMedicine}
              canViewGift={access.canViewGift}
              canViewOffer={access.canViewOffer}
            />
          </main>
        </div>
      </div>
    </>
  );
}
