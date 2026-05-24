import { useTranslation } from 'react-i18next';

import { PharmaciesTable } from './PharmaciesTable';
import { useGetPharmaciesSuspense } from '@/entities/pharmacy';
import { PageTitle, QueryErrorBoundary } from '@/shared/ui';

export default function PharmaciesListPage() {
  return (
    <QueryErrorBoundary>
      <PharmacyListContent />
    </QueryErrorBoundary>
  );
}

function PharmacyListContent() {
  const { t } = useTranslation('pharmacies', { keyPrefix: 'list' });
  const { data } = useGetPharmaciesSuspense();

  return (
    <>
      <PageTitle title={t('title')} subtitle={t('subtitle')} />
      <PharmaciesTable data={data!.data!} />
    </>
  );
}
