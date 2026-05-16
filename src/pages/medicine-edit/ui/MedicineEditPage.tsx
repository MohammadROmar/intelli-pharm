import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { MedicineEditForm } from './MedicineEditForm';
import { useGetMedicineSuspense } from '@/entities/medicine';
import { PageTitle, QueryErrorBoundary, QueryDisabled } from '@/shared/ui';

export default function MedicineEditPage() {
  const { id } = useParams<{ id: string }>();
  const medicineId = Number(id);

  if (!id || Number.isNaN(medicineId)) {
    return <QueryDisabled isEdit path="/dashboard/medicines" />;
  }

  return (
    <QueryErrorBoundary>
      <MedicineEditPageContent medicineId={medicineId} />
    </QueryErrorBoundary>
  );
}

type MedicineEditPageContentProps = { medicineId: number };

function MedicineEditPageContent({ medicineId }: MedicineEditPageContentProps) {
  const { t } = useTranslation('medicines', {
    keyPrefix: 'edit',
  });

  const { data } = useGetMedicineSuspense(medicineId);

  const medicine = data.data!;

  return (
    <>
      <PageTitle title={t('title')} subtitle={t('subtitle')} />
      <MedicineEditForm id={medicine.id} medicine={medicine} />
    </>
  );
}
