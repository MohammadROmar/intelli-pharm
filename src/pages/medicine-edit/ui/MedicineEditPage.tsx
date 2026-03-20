import { useTranslation } from 'react-i18next';

import { MedicineEditForm } from './MedicineEditForm';
import {
  useGetMedicine,
  type Medicine,
  type MedicineFormData,
} from '@/entities/medicine';
import { FormSkeleton, PageTitle, QueryError } from '@/shared/ui';

function medicineToFromData(medicine: Medicine): MedicineFormData {
  const is_alternative = medicine.alternatives.length > 0;

  return {
    ...medicine,
    category_id: medicine.category_id.toString(),
    is_alternative,
    stocks: [],
    is_alternative_to_id: is_alternative
      ? medicine.alternatives[0].id.toString()
      : null,
    imagesCount: medicine.images.length,
    note: medicine.note ?? '',
  };
}

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
      <MedicineEditForm id={medicine.id} data={medicineToFromData(medicine)} />
    </>
  );
}
