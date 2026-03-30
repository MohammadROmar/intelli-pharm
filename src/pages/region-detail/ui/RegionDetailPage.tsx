import { RegionInfoCard } from './RegionInfoCard';
import { RegionDetailHeader } from './RegionDetailHeader';
import { RegionPharmaciesTable } from './RegionPharmaciesTable';
import { useGetRegion } from '@/entities/region';
import { DetailSkeleton, QueryError } from '@/shared/ui';

export default function RegionDetailPage() {
  const { data, isLoading, isError, error, refetch } = useGetRegion();

  if (isError) {
    return <QueryError error={error} onRetry={refetch} />;
  }

  if (isLoading || !data) {
    return <DetailSkeleton cards={[{ rows: 1 }]} tables={1} />;
  }

  const region = data.data!;

  return (
    <div className="space-y-6">
      <RegionDetailHeader region={region} />
      <RegionInfoCard region={region} />
      <RegionPharmaciesTable pharmacies={region.pharmacies} />
    </div>
  );
}
