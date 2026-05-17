import { useTranslation } from 'react-i18next';

import { DeliveriesTable } from './DeliveryTable';
import { useGetDeliveriesSuspense } from '../model/useGetDeliveriesSuspense';
import { PageTitle, QueryErrorBoundary } from '@/shared/ui';

export default function DeliveryListPage() {
  return (
    <QueryErrorBoundary>
      <DeliveryListContent />
    </QueryErrorBoundary>
  );
}

function DeliveryListContent() {
  const { t } = useTranslation('deliveries', { keyPrefix: 'list' });
  const { data } = useGetDeliveriesSuspense();

  return (
    <>
      <PageTitle title={t('title')} subtitle={t('subtitle')} />
      <DeliveriesTable data={data!.data!} />
    </>
  );
}
