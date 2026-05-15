import { useTranslation } from 'react-i18next';

import { OffersTable } from './OffersTable';
import { useGetOffers } from '../model/useGetOffers';
import { PageTitle, QueryError, TableSkeleton } from '@/shared/ui';

export default function OfferListPage() {
  const { t } = useTranslation('offers', { keyPrefix: 'list' });

  const { data, isLoading, error, isError, refetch } = useGetOffers();

  if (isError) {
    return <QueryError error={error} onRetry={refetch} />;
  }

  if (isLoading || !data) {
    return <TableSkeleton />;
  }

  return (
    <>
      <PageTitle title={t('title')} subtitle={t('subtitle')} />
      <OffersTable data={data.data!} />
    </>
  );
}
