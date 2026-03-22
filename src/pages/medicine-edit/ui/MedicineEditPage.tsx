import { useTranslation } from 'react-i18next';

import { MedicineEditForm } from './MedicineEditForm';
import { useGetMedicine } from '@/entities/medicine';
import { FormSkeleton, PageTitle, QueryError } from '@/shared/ui';

export default function MedicineEditPage() {
  const { t } = useTranslation('translation', {
    keyPrefix: 'medicinesPage.edit',
  });

  const { isLoading, data, isError, error } = useGetMedicine();

  if (isError) {
    return <QueryError error={error} />;
  }

  if (isLoading || !data) {
    return <FormSkeleton fields={4} />;
  }

  const medicine = data.data!;

  return (
    <>
      <PageTitle title={t('title')} subtitle={t('subtitle')} />
      <MedicineEditForm id={medicine.id} medicine={medicine} />
    </>
  );
}
