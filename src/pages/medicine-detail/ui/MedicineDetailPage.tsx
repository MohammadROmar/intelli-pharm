import { StocksCard } from './StocksCard';
import { MedicineInfoGrid } from './MedicineInfoGrid';
import { AlternativesTable } from './AlternativesTable';
import { MedicineBarcodeCard } from './MedicineBarcodeCard';
import { MedicineImageGallery } from './MedicineImageGallery';
import { MedicineDetailHeader } from './MedicineDetailHeader';
import { useGetMedicine } from '@/entities/medicine';
import { DetailSkeleton, QueryDisabled, QueryError } from '@/shared/ui';

export default function MedicineDetailPage() {
  const { isLoading, data, isEnabled, isError, error, refetch } =
    useGetMedicine();

  if (!isEnabled) {
    return <QueryDisabled path="/dashboard/medicines" />;
  }

  if (isError) {
    return <QueryError error={error} onRetry={refetch} />;
  }

  if (isLoading || !data) {
    return <DetailSkeleton cards={[{ rows: 4 }]} tables={3} hasImage />;
  }

  const medicine = data.data!;

  return (
    <div className="space-y-6">
      <MedicineDetailHeader medicine={medicine} />

      <div className="grid max-w-full grid-cols-1 gap-6 lg:grid-cols-3">
        <MedicineImageGallery
          images={medicine.images}
          medicineName={medicine.name}
        />
        <MedicineInfoGrid medicine={medicine} />
      </div>

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
