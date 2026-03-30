import { useTranslation } from 'react-i18next';

import { PharmacyEditForm } from '@/features/pharmacy-edit';
import { useGetPharmacy } from '@/entities/pharmacy';
import { FormSkeleton, PageTitle, QueryError } from '@/shared/ui';

export default function PharmacyEditPage() {
  const { t } = useTranslation('translation', {
    keyPrefix: 'pharmaciesPage.edit',
  });

  const { data, isError, error, isLoading, refetch } = useGetPharmacy();

  if (isError) {
    return <QueryError error={error} onRetry={refetch} />;
  }

  if (isLoading || !data) {
    return <FormSkeleton cards={[{ rows: 3 }, { rows: 2 }]} />;
  }

  return (
    <>
      <PageTitle title={t('title')} subtitle={t('subtitle')} />
      <PharmacyEditForm pharmacy={data.data!} />
    </>
  );
}
