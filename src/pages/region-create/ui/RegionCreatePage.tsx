import { useTranslation } from 'react-i18next';

import { CreateRegionForm } from '@/features/region-create';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  PageTitle,
} from '@/shared/ui';

export default function RegionCreatePage() {
  const { t } = useTranslation('translation', {
    keyPrefix: 'regionsPage',
  });

  return (
    <>
      <PageTitle title={t('create.title')} subtitle={t('create.subtitle')} />

      <Card>
        <CardHeader>
          <CardTitle>{t('form.title')}</CardTitle>
          <CardDescription>{t('form.subtitle')}</CardDescription>
        </CardHeader>
        <CardContent>
          <CreateRegionForm />
        </CardContent>
      </Card>
    </>
  );
}
