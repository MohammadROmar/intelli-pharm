import { useTranslation } from 'react-i18next';

import { MedicineRestock } from '@/features/medicine-restock';
import { useGetMedicine } from '@/entities/medicine';
import {
  PageTitle,
  QueryError,
  FormSkeleton,
  QueryDisabled,
} from '@/shared/ui';

export default function MedicineRestockPage() {
  const { t } = useTranslation('translation', {
    keyPrefix: 'medicinesPage.restock',
  });

  const { data, isLoading, isEnabled, isError, error, refetch } =
    useGetMedicine();

  if (!isEnabled) {
    return <QueryDisabled isEdit path="/dashboard/categories" />;
  }

  if (isError) {
    return <QueryError error={error} onRetry={refetch} />;
  }

  if (isLoading || !data) {
    return <FormSkeleton cards={[{ rows: 2 }]} />;
  }

  return (
    <>
      <PageTitle title={t('title')} subtitle={t('subtitle')} />
      <MedicineRestock id={data.data!.id} />
    </>
  );
}
