import { useTranslation } from 'react-i18next';

import { EmployeeList } from './EmployeeList';
import { useGetEmployees } from '../model/useGetEmployees';
import { TableSkeleton, QueryError, PageTitle } from '@/shared/ui';

export default function EmployeeListPage() {
  const { t } = useTranslation('translation', {
    keyPrefix: 'employeesPage.list',
  });

  const {
    data: employeesData,
    isError,
    error,
    isLoading,
    refetch,
  } = useGetEmployees();

  if (isError) {
    return <QueryError error={error} onRetry={refetch} />;
  }

  if (isLoading || !employeesData) {
    return <TableSkeleton />;
  }

  return (
    <>
      <PageTitle title={t('title')} subtitle={t('subtitle')} />
      <EmployeeList data={employeesData.data!} />
    </>
  );
}
