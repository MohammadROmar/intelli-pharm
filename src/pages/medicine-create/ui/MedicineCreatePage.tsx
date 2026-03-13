import { useTranslation } from 'react-i18next';

import { MedicineForm } from '@/entities/medicine';
import { PageTitle } from '@/shared/ui';

export default function MedicineCreatePage() {
  const { t } = useTranslation('translation', {
    keyPrefix: 'medicinesPage.create',
  });

  return (
    <>
      <PageTitle title={t('title')} subtitle={t('subtitle')} />

      <MedicineForm />
    </>
  );
}
