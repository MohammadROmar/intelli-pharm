import { useTranslation } from 'react-i18next';

import { AdminEditRestricted } from './AdminEditRestricted';
import { useGetEmployee } from '../model/useGetEmployee';
import { UpdateEmployeeForm } from '@/features/employee-edit';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  FormSkeleton,
  PageTitle,
  QueryError,
} from '@/shared/ui';

export default function UpdateEmployeePage() {
  const { data, isLoading, isError, error } = useGetEmployee();
  const { t } = useTranslation('translation', {
    keyPrefix: 'employeesPage.update',
  });

  if (isError) {
    return <QueryError error={error} />;
  }

  if (!data || isLoading) {
    return <FormSkeleton fields={3} />;
  }

  const isAdmin = data.data!.roles[0] === 'admin';

  return (
    <>
      <PageTitle title={t('title')} subtitle={t('subtitle')} />
      {isAdmin ? (
        <AdminEditRestricted />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>{t('formTitle')}</CardTitle>
            <CardDescription>{t('formSubtitle')}</CardDescription>
          </CardHeader>
          <CardContent>
            <UpdateEmployeeForm employee={data.data!} />
          </CardContent>
        </Card>
      )}
    </>
  );
}
