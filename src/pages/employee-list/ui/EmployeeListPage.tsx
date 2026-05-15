import { useTranslation } from 'react-i18next';

import { EmployeeTable } from './EmployeeTable';
import { useGetEmployees } from '../model/useGetEmployees';
import { TableSkeleton, QueryError, PageTitle } from '@/shared/ui';

export default function EmployeeListPage() {
  const { t } = useTranslation('employees', {
    keyPrefix: 'list',
  });

  const { data, isError, error, isLoading, refetch } = useGetEmployees();

  if (isError) {
    return <QueryError error={error} onRetry={refetch} />;
  }

  if (isLoading || !data) {
    return <TableSkeleton />;
  }

  return (
    <>
      <PageTitle title={t('title')} subtitle={t('subtitle')} />
      <EmployeeTable data={data.data!} />
    </>
  );
}
