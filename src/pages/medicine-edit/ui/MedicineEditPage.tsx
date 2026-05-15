import { useTranslation } from 'react-i18next';

import { MedicineEditForm } from './MedicineEditForm';
import { useGetMedicine } from '@/entities/medicine';
import {
  PageTitle,
  QueryError,
  FormSkeleton,
  QueryDisabled,
} from '@/shared/ui';

export default function MedicineEditPage() {
  const { t } = useTranslation('medicines', {
    keyPrefix: 'edit',
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
    return <FormSkeleton cards={[{ rows: 7 }, { rows: 2 }]} />;
  }

  const medicine = data.data!;

  return (
    <>
      <PageTitle title={t('title')} subtitle={t('subtitle')} />
      <MedicineEditForm id={medicine.id} medicine={medicine} />
    </>
  );
}
