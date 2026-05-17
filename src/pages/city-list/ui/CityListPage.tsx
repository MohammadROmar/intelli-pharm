import { useTranslation } from 'react-i18next';

import { CityTable } from './CityTable';
import { useGetCitiesSuspense } from '../model/useGetCitiesSuspense';
import { PageTitle, QueryErrorBoundary } from '@/shared/ui';

export default function MedicineListPage() {
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
