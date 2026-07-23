import { useTranslation } from 'react-i18next';

import { PageTitle, QueryErrorBoundary } from '@/shared/ui';

import { CityTable } from './CityTable';
import { useGetCitiesSuspense } from '../model/useGetCitiesSuspense';

export default function CityListPage() {
  return (
    <QueryErrorBoundary>
      <CityListContent />
    </QueryErrorBoundary>
  );
}

function CityListContent() {
  const { t } = useTranslation('cities', { keyPrefix: 'list' });
  const { data } = useGetCitiesSuspense();

  return (
    <>
      <PageTitle title={t('title')} subtitle={t('subtitle')} />
      <CityTable data={data!.data!} />
    </>
  );
}
