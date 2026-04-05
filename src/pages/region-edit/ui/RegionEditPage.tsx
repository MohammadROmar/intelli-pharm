import { useTranslation } from 'react-i18next';

import { RegionEditForm } from '@/features/region-edit';
import { useGetRegion } from '@/entities/region';
import { FormSkeleton, PageTitle, QueryError } from '@/shared/ui';

export default function RegionEditPage() {
  const { t } = useTranslation('translation', {
    keyPrefix: 'regionsPage',
  });

  const { data, isError, error, isLoading, refetch } = useGetRegion();

  if (isError) {
    return <QueryError error={error} onRetry={refetch} />;
  }

  if (isLoading || !data) {
    return <FormSkeleton cards={[{ rows: 2 }]} />;
  }

  return (
    <>
      <PageTitle title={t('edit.title')} subtitle={t('edit.subtitle')} />
      <RegionEditForm region={data.data!} />
    </>
  );
}
