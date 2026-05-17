import { useTranslation } from 'react-i18next';

import { OffersTable } from './OffersTable';
import { useGetOffersSuspense } from '../model/useGetOffersSuspense';
import { PageTitle, QueryErrorBoundary } from '@/shared/ui';

export default function OfferListPage() {
  return (
    <QueryErrorBoundary>
      <OfferListContent />
    </QueryErrorBoundary>
  );
}

function OfferListContent() {
  const { t } = useTranslation('offers', { keyPrefix: 'list' });
  const { data } = useGetOffersSuspense();

  return (
    <>
      <PageTitle title={t('title')} subtitle={t('subtitle')} />
      <OffersTable data={data!.data!} />
    </>
  );
}
