import { useTranslation } from 'react-i18next';

import { AdminEditRestricted } from './AdminEditRestricted';
import { useGetEmployee } from '../model/useGetEmployee';
import { EditEmployeeForm } from '@/features/employee-edit';
import {
  PageTitle,
  QueryError,
  FormSkeleton,
  QueryDisabled,
} from '@/shared/ui';

export default function EmployeeEditPage() {
  const { t } = useTranslation('translation', {
    keyPrefix: 'employeesPage.update',
  });

  const { data, isLoading, isEnabled, isError, error, refetch } =
    useGetEmployee();

  if (!isEnabled) {
    return <QueryDisabled isEdit path="/dashboard/categories" />;
  }

  if (isError) {
    return <QueryError error={error} onRetry={refetch} />;
  }

  if (!data || isLoading) {
    return <FormSkeleton cards={[{ rows: 3 }, { rows: 4 }]} />;
  }

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
