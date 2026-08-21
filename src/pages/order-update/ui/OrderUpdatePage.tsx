import { Navigate, useParams } from 'react-router';
import { useTranslation } from 'react-i18next';

import { OrderUpdateEditor } from '@/features/order-editor';
import { useGetOrderSuspense } from '@/entities/order';
import { PageTitle, QueryDisabled, QueryErrorBoundary } from '@/shared/ui';

export default function OrderUpdatePage() {
  const { id } = useParams<{ id: string }>();
  const orderId = Number(id);

  if (!id || Number.isNaN(orderId)) {
    return <QueryDisabled path="/dashboard/orders" />;
  }

  return (
    <QueryErrorBoundary>
      <OrderUpdateContent orderId={orderId} />
    </QueryErrorBoundary>
  );
}

type ContentProps = {
  orderId: number;
};

function OrderUpdateContent({ orderId }: ContentProps) {
  const { t } = useTranslation('order-update', { keyPrefix: 'page' });
  const { data } = useGetOrderSuspense(orderId);
  const order = data.data;

  if (!order) {
    throw new Error('Order response did not include order data.');
  }

  if (order.status === 'completed' || order.status === 'cancelled') {
    return <Navigate to={`/dashboard/orders/${order.id}`} replace />;
  }

  const orderCode = `ORD-${String(order.id).padStart(6, '0')}`;

  return (
    <>
      <title>{`${t('documentTitle', { order: orderCode })} - IntelliPharm`}</title>
      <PageTitle
        title={t('title', { order: orderCode })}
        subtitle={t('subtitle')}
      />
      <OrderUpdateEditor order={order} />
    </>
  );
}
