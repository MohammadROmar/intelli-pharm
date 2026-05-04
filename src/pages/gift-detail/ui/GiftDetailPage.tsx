import { GiftInfoCard } from './GiftInfoCard';
import { GiftDetailHeader } from './GiftDetailHeader';
import { useGetGift } from '../model/useGetGift';
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
    <>
      <GiftDetailHeader gift={gift} />
      <GiftInfoCard gift={gift} />
    </>
  );
}
