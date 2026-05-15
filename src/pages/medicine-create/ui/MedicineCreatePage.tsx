import { useTranslation } from 'react-i18next';

import { MedicineCreateForm } from './MedicineCreateForm';
import { PageTitle } from '@/shared/ui';

export default function MedicineCreatePage() {
  const { t } = useTranslation('medicines', {
    keyPrefix: 'create',
  });

  return (
    <>
      <PageTitle title={t('title')} subtitle={t('subtitle')} />
      <MedicineCreateForm />
    </>
  );
}
