import { PharmacistCard } from './PharmacistCard';
import { PharmacyInfoCard } from './PharmacyInfoCard';
import { PharmacyDetailHeader } from './PharmacyDetailHeader';
import { PharmacyLocationCard } from './PharmacyLocationCard';
import { useGetPharmacy } from '@/entities/pharmacy';
import { DetailSkeleton, QueryError } from '@/shared/ui';

export default function PharmacyDetailPage() {
  const { data, isLoading, isError, error, refetch } = useGetPharmacy();

  if (isError) {
    return <QueryError error={error} onRetry={refetch} />;
  }

  if (isLoading || !data) {
    return (
      <DetailSkeleton
        cards={[{ rows: 2 }, { rows: 2 }, { rows: 1 }]}
        tables={0}
      />
    );
  }

  const pharmacy = data.data!;

  return (
    <div className="space-y-6">
      <PharmacyDetailHeader pharmacy={pharmacy} />
      <PharmacistCard pharmacy={pharmacy} />
      <PharmacyInfoCard pharmacy={pharmacy} />
      <PharmacyLocationCard pharmacy={pharmacy} />
    </div>
  );
}
