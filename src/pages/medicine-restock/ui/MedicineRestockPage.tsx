import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { MedicineRestock } from '@/features/medicine-restock';
import { useGetMedicineSuspense } from '@/entities/medicine';
import { PageTitle, QueryErrorBoundary, QueryDisabled } from '@/shared/ui';

export default function MedicineRestockPage() {
  const { id } = useParams<{ id: string }>();
  const medicineId = Number(id);

  if (!id || Number.isNaN(medicineId)) {
    return <QueryDisabled path="/dashboard/medicines" />;
  }

  return (
    <QueryErrorBoundary>
      <MedicineRestockContent medicineId={medicineId} />
    </QueryErrorBoundary>
  );
}

type MedicineRestockContentProps = { medicineId: number };

function MedicineRestockContent({ medicineId }: MedicineRestockContentProps) {
  const { t } = useTranslation('medicines', { keyPrefix: 'restock' });
  const { data } = useGetMedicineSuspense(medicineId);

  return (
    <>
      <PageTitle title={t('title')} subtitle={t('subtitle')} />
      <MedicineRestock id={data.data!.id} />
    </>
  );
}
