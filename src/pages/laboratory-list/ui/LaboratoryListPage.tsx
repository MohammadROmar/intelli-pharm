import { useTranslation } from 'react-i18next';

import { LaboratoryTable } from './LaboratoryList';
import { useGetLaboratories } from '../model/useGetLaboratories';
import { PageTitle, QueryError, TableSkeleton } from '@/shared/ui';

export default function LaboratoryListPage() {
  const { t } = useTranslation('translation', {
    keyPrefix: 'laboratoriesPage',
  });

  const { data, isLoading, isError, error, refetch } = useGetLaboratories();

  if (isError) {
    return <QueryError error={error} onRetry={refetch} />;
  }

  if (isLoading || !data) {
    return <TableSkeleton />;
  }

  return (
    <>
      <PageTitle title={t('list.title')} subtitle={t('list.subtitle')} />
      <LaboratoryTable data={data.data!} />
    </>
  );
}
