import { useTranslation } from 'react-i18next';

import { EmployeeForm } from '@/entities/employee';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  PageTitle,
} from '@/shared/ui';

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
          <EmployeeForm
            onSubmit={(data) => {
              console.log(data);
            }}
          />
        </CardContent>
      </Card>
    </>
  );
}
