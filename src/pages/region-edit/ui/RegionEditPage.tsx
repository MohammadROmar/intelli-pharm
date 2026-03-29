import { useTranslation } from 'react-i18next';

import { RegionEditForm } from '@/features/region-edit';
import { useGetRegion } from '@/entities/region';
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

export default function RegionEditPage() {
  const { t } = useTranslation('translation', {
    keyPrefix: 'regionsPage',
  });

  const { data, isError, error, isLoading } = useGetRegion();

  if (isError) {
    return <QueryError error={error} />;
  }

  if (isLoading || !data) {
    return <FormSkeleton fields={2} />;
  }

  return (
    <>
      <PageTitle title={t('edit.title')} subtitle={t('edit.subtitle')} />

      <Card>
        <CardHeader>
          <CardTitle>{t('form.title')}</CardTitle>
          <CardDescription>{t('form.subtitle')}</CardDescription>
        </CardHeader>
        <CardContent>
          <RegionEditForm region={data.data!} />
        </CardContent>
      </Card>
    </>
  );
}
