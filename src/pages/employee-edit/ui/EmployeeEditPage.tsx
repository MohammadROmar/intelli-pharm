import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';

import { EditEmployeeForm } from '@/features/employee-form';
import { useGetEmployeeSuspense } from '@/entities/employee';
import { PageTitle, QueryErrorBoundary, QueryDisabled } from '@/shared/ui';

import { AdminEditRestricted } from './AdminEditRestricted';

export default function EmployeeEditPage() {
  const { id } = useParams<{ id: string }>();
  const employeeId = Number(id);

  if (!id || Number.isNaN(employeeId)) {
    return <QueryDisabled isEdit path="/dashboard/employees" />;
  }

  return (
    <QueryErrorBoundary>
      <EmployeeEditPageContent employeeId={employeeId} />
    </QueryErrorBoundary>
  );
}

type EmployeeEditPageContentProps = { employeeId: number };

function EmployeeEditPageContent({ employeeId }: EmployeeEditPageContentProps) {
  const { t } = useTranslation('employees', {
    keyPrefix: 'update',
  });

  const { data } = useGetEmployeeSuspense(employeeId);

  const isAdmin = data.data!.roles[0] === 'admin';

  return (
    <>
      <PageTitle title={t('title')} subtitle={t('subtitle')} />
      {isAdmin ? (
        <AdminEditRestricted />
      ) : (
        <EditEmployeeForm employee={data.data!} />
      )}
    </>
  );
}
