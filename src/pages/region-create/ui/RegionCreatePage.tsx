import { useTranslation } from 'react-i18next';

import { CreateRegionForm } from '@/features/region-create';
import { PageTitle } from '@/shared/ui';

export default function RegionCreatePage() {
  const { t } = useTranslation('regions');

  return (
    <>
      <PageTitle title={t('create.title')} subtitle={t('create.subtitle')} />
      <CreateRegionForm />
    </>
  );
}
