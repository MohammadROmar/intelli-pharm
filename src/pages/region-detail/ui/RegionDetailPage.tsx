import { useParams } from 'react-router';

import { RegionInfoCard } from './RegionInfoCard';
import { RegionDetailHeader } from './RegionDetailHeader';
import { RegionPharmaciesTable } from './RegionPharmaciesTable';
import { useGetRegionSuspense } from '@/entities/region';
import { QueryErrorBoundary, QueryDisabled } from '@/shared/ui';

export default function RegionDetailPage() {
  const { id } = useParams<{ id: string }>();
  const regionId = Number(id);

  if (!id || Number.isNaN(regionId)) {
    return <QueryDisabled path="/dashboard/regions" />;
  }

  return (
    <QueryErrorBoundary>
      <RegionDetailContent regionId={regionId} />
    </QueryErrorBoundary>
  );
}

type RegionDetailContentProps = { regionId: number };

function RegionDetailContent({ regionId }: RegionDetailContentProps) {
  const { data } = useGetRegionSuspense(regionId);

  const region = data.data!;

  return (
    <div className="space-y-6">
      <RegionDetailHeader region={region} />
      <RegionInfoCard region={region} />
      <RegionPharmaciesTable pharmacies={region.pharmacies} />
    </div>
  );
}
