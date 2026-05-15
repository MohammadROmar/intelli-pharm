import { useTranslation } from 'react-i18next';

import { OrdersTable } from './OrdersTable';
import { useGetOrders } from '../model/useGetOrders';
import { TableSkeleton, QueryError, PageTitle } from '@/shared/ui';

export default function OrderListPage() {
  const { t } = useTranslation('orders', {
    keyPrefix: 'list',
  });

  const { data, isError, error, isLoading, refetch } = useGetOrders();

  if (isError) {
    return <QueryError error={error} onRetry={refetch} />;
  }

  if (isLoading || !data) {
    return <TableSkeleton />;
  }

  return (
    <>
      <PageTitle title={t('title')} subtitle={t('subtitle')} />
      <OrdersTable data={data.data!} />
    </>
  );
}
