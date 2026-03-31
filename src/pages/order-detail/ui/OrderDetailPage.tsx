import { useTranslation } from 'react-i18next';

import { OrderInfoCard } from './OrderInfoCard';
import { OrderItemsTable } from './OrderItemsTable';
import { useGetOrder } from '../model/useGetOrder';
import { ChangeOrderStatus } from '@/features/order-change-status';
import { DetailSkeleton, QueryError } from '@/shared/ui';

export default function OrderDetailPage() {
  const { t } = useTranslation('translation', {
    keyPrefix: 'ordersPage.detail',
  });

  const { data, isLoading, isError, error, refetch } = useGetOrder();

  if (isError) {
    return <QueryError error={error} onRetry={refetch} />;
  }

  if (isLoading || !data) {
    return <DetailSkeleton cards={[{ rows: 4 }]} tables={1} />;
  }

  const order = data.data!;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
          {t('orderNo', { order: order.id })}
        </h1>
        <ChangeOrderStatus order={order} />
      </div>
      <OrderInfoCard order={order} />
      <OrderItemsTable
        items={order.items}
        totalAmount={order.total_amount}
        totalQuantity={order.total_quantity}
      />
    </div>
  );
}
