import { useTranslation } from 'react-i18next';

import { OrdersTable } from './OrdersTable';
import { useGetOrdersSuspense } from '../model/useGetOrdersSuspense';
import { PageTitle, QueryErrorBoundary } from '@/shared/ui';

export default function OrderListPage() {
  return (
    <QueryErrorBoundary>
      <OrderListContent />
    </QueryErrorBoundary>
  );
}

function OrderListContent() {
  const { t } = useTranslation('orders', { keyPrefix: 'list' });
  const { data } = useGetOrdersSuspense();

  return (
    <>
      <PageTitle title={t('title')} subtitle={t('subtitle')} />
      <OrdersTable data={data!.data!} />
    </>
  );
}
