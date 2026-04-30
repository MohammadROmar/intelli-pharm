import { GiftInfoCard } from './GiftInfoCard';
import { useGetGift } from '../model/useGetGift';
import { GiftDetailHeader } from './GiftDetailHeader';
import { QueryError, QueryDisabled, DetailSkeleton } from '@/shared/ui';

export default function GiftDetailPage() {
  const { data, isLoading, isEnabled, isError, error, refetch } = useGetGift();

  if (!isEnabled) {
    return <QueryDisabled path="/dashboard/categories" />;
  }

  if (isError) {
    return <QueryError error={error} onRetry={refetch} />;
  }

  if (isLoading || !data) {
    return <DetailSkeleton cards={[{ rows: 4 }]} tables={0} />;
  }

  const gift = data.data!;

  return (
    <div className="space-y-6">
      <GiftDetailHeader gift={gift} />

      <GiftInfoCard gift={gift} />
    </div>
  );
}
