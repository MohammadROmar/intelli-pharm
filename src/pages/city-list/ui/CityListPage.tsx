import { useTranslation } from 'react-i18next';

import { CitiesTable } from './CityTable';
import { useGetCities } from '../model/useGetCities';
import { PageTitle, QueryError, TableSkeleton } from '@/shared/ui';

export default function CitiesPage() {
  const { t } = useTranslation('cities');

  const { data, isLoading, isError, error, refetch } = useGetCities();

  if (isError) {
    return <QueryError error={error} onRetry={refetch} />;
  }

  if (isLoading || !data) {
    return <TableSkeleton />;
  }

  return (
    <>
      <PageTitle title={t('list.title')} subtitle={t('list.subtitle')} />
      <CitiesTable data={data.data!} />
    </>
  );
}
