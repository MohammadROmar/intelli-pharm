import { useTranslation } from 'react-i18next';

import { DeliveriesTable } from './DeliveryTable';
import { useGetDeliveries } from '../model/useGetDeliveries';
import { TableSkeleton, QueryError, PageTitle } from '@/shared/ui';

export default function DeliveryListPage() {
  const { t } = useTranslation('deliveries', {
    keyPrefix: 'list',
  });

  const { data, isError, error, isLoading, refetch } = useGetDeliveries();

  if (isError) {
    return <QueryError error={error} onRetry={refetch} />;
  }

  if (isLoading || !data) {
    return <TableSkeleton />;
  }

  return (
    <>
      <PageTitle title={t('title')} subtitle={t('subtitle')} />
      <DeliveriesTable data={data.data!} />
    </>
  );
}
