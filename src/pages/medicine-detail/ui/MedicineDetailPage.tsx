import { useParams } from 'react-router';

import { useGetMedicineSuspense } from '@/entities/medicine';
import { QueryErrorBoundary, QueryDisabled } from '@/shared/ui';

import { GiftCard } from './GiftCard';
import { StocksCard } from './StocksCard';
import { MedicineInfoGrid } from './MedicineInfoGrid';
import { AlternativesTable } from './AlternativesTable';
import { MedicineBarcodeCard } from './MedicineBarcodeCard';
import { MedicineImageGallery } from './MedicineImageGallery';
import { MedicineDetailHeader } from './MedicineDetailHeader';
import { useMedicineDetailAccess } from '../model/useMedicineDetailAccess';

export default function MedicineDetailPage() {
  const { id } = useParams<{ id: string }>();
  const medicineId = Number(id);

  if (!id || Number.isNaN(medicineId)) {
    return <QueryDisabled path="/dashboard/medicines" />;
  }

  return (
    <QueryErrorBoundary>
      <MedicineDetailContent medicineId={medicineId} />
    </QueryErrorBoundary>
  );
}

type MedicineDetailContentProps = { medicineId: number };

function MedicineDetailContent({ medicineId }: MedicineDetailContentProps) {
  const { data } = useGetMedicineSuspense(medicineId);

  const { canViewCategory, canViewLaboratory } = useMedicineDetailAccess();

  const medicine = data.data!;

  const hasGift =
    medicine.gift.gift_quantity !== 0 && medicine.gift.required_quantity !== 0;

  return (
    <div className="space-y-6">
      <MedicineDetailHeader medicine={medicine} />

      <div className="grid max-w-full grid-cols-1 gap-6 lg:grid-cols-3">
        <MedicineImageGallery images={medicine.images} />
        <MedicineInfoGrid
          medicine={medicine}
          canViewCategory={canViewCategory}
          canViewLaboratory={canViewLaboratory}
        />
      </div>

      {hasGift && <GiftCard medicine={medicine} />}

      <MedicineBarcodeCard barcode={medicine.barcode} />

      <StocksCard stocks={medicine.stocks} />
      <AlternativesTable
        mode="alternatives"
        alternatives={medicine.alternatives}
      />
      <AlternativesTable
        mode="alternativeFor"
        alternatives={medicine.alternative_for}
      />
    </div>
  );
}
