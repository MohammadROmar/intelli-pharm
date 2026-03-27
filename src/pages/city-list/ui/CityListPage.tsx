import { useTranslation } from 'react-i18next';

import { CitiesTable } from './CityList';
import { useGetCities } from '../model/useGetCities';
import { PageTitle, QueryError, TableSkeleton } from '@/shared/ui';

export default function CitiesPage() {
  const { t } = useTranslation('translation', {
    keyPrefix: 'citiesPage',
  });

  const { data, isLoading, isError, error } = useGetCities();

  if (isError) {
    return <QueryError error={error} />;
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
