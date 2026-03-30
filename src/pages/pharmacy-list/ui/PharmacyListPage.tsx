import { useTranslation } from 'react-i18next';

import { PharmaciesTable } from './PharmaciesTable';
import { useGetPharmacies } from '../model/useGetPharmacies';
import { PageTitle, QueryError, TableSkeleton } from '@/shared/ui';

export default function PharmaciesListPage() {
  const { t } = useTranslation('translation', {
    keyPrefix: 'pharmaciesPage.list',
  });

  const { data, isLoading, error, isError, refetch } = useGetPharmacies();

  if (isError) {
    return <QueryError error={error} onRetry={refetch} />;
  }

  if (isLoading || !data) {
    return <TableSkeleton />;
  }

  return (
    <>
      <PageTitle title={t('title')} subtitle={t('subtitle')} />
      <PharmaciesTable data={data.data!} />
    </>
  );
}
