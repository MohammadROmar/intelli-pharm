import { useTranslation } from 'react-i18next';

import { EmployeeTable } from './EmployeeTable';
import { useGetEmployeesSuspense } from '../model/useGetEmployeesSuspense';
import { PageTitle, QueryErrorBoundary } from '@/shared/ui';

export default function EmployeeListPage() {
  return (
    <QueryErrorBoundary>
      <EmployeeListContent />
    </QueryErrorBoundary>
  );
}

function EmployeeListContent() {
  const { t } = useTranslation('employees', { keyPrefix: 'list' });
  const { data } = useGetEmployeesSuspense();

  return (
    <>
      <PageTitle title={t('title')} subtitle={t('subtitle')} />
      <EmployeeTable data={data!.data!} />
    </>
  );
}
