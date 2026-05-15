import { useTranslation } from 'react-i18next';

import { CreateEmployeeForm } from '@/features/employee-create';
import { PageTitle } from '@/shared/ui';

export default function EmployeeCreatePage() {
  const { t } = useTranslation('employees', {
    keyPrefix: 'create',
  });

  return (
    <>
      <PageTitle title={t('title')} subtitle={t('subtitle')} />
      <CreateEmployeeForm />
    </>
  );
}
