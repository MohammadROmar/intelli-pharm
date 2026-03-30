import { useTranslation } from 'react-i18next';

import { PharmacyCreateForm } from '@/features/pharmacy-create';
import { PageTitle } from '@/shared/ui';

export default function PharmacyCreatePage() {
  const { t } = useTranslation('translation', {
    keyPrefix: 'pharmaciesPage',
  });

  return (
    <>
      <PageTitle title={t('create.title')} subtitle={t('create.subtitle')} />
      <PharmacyCreateForm />
    </>
  );
}
