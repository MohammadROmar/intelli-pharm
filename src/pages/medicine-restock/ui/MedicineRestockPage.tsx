import { useTranslation } from 'react-i18next';

import { MedicineRestock } from '@/features/medicine-restock';
import { useGetMedicine } from '@/entities/medicine';
import { FormSkeleton, PageTitle, QueryError } from '@/shared/ui';

export default function MedicineRestockPage() {
  const { t } = useTranslation('translation', {
    keyPrefix: 'medicinesPage.restock',
  });

  const { isLoading, data, isError, error, refetch } = useGetMedicine();

  if (isError) {
    return <QueryError error={error} onRetry={refetch} />;
  }

  if (isLoading || !data) {
    return <FormSkeleton cards={[{ rows: 2 }]} />;
  }

  return (
    <>
      <PageTitle title={t('title')} subtitle={t('subtitle')} />
      <MedicineRestock id={data.data!.id} />;
    </>
  );
}
