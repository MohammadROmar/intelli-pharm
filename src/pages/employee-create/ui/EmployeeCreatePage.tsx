import { useTranslation } from 'react-i18next';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  PageTitle,
} from '@/shared/ui';
import { CreateEmployeeForm } from '@/features/employee-create';

export default function EmployeeCreatePage() {
  const { t } = useTranslation('translation', {
    keyPrefix: 'employeesPage.create',
  });

  return (
    <>
      <PageTitle title={t('title')} subtitle={t('subtitle')} />

      <Card>
        <CardHeader>
          <CardTitle>{t('formTitle')}</CardTitle>
          <CardDescription>{t('formSubtitle')}</CardDescription>
        </CardHeader>
        <CardContent>
          <CreateEmployeeForm />
        </CardContent>
      </Card>
    </>
  );
}
