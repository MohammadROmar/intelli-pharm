import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';

import { MedicineEditStock } from '@/features/medicine-stock';
import { useGetMedicineSuspense } from '@/entities/medicine';
import { PageTitle, QueryErrorBoundary, QueryDisabled } from '@/shared/ui';

export default function MedicineEditStockPage() {
  const { id } = useParams<{ id: string }>();
  const medicineId = Number(id);

  if (!id || Number.isNaN(medicineId)) {
    return <QueryDisabled path="/dashboard/medicines" />;
  }

  return (
    <QueryErrorBoundary>
      <MedicineEditStockContent medicineId={medicineId} />
    </QueryErrorBoundary>
  );
}

type MedicineEditStockContentProps = { medicineId: number };

function MedicineEditStockContent({
  medicineId,
}: MedicineEditStockContentProps) {
  const { t } = useTranslation('medicines', { keyPrefix: 'editStock' });
  const { data } = useGetMedicineSuspense(medicineId);

  return (
    <>
      <PageTitle title={t('title')} subtitle={t('subtitle')} />
      <MedicineEditStock medicine={data.data!} />
    </>
  );
}
