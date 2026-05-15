import { OfferDetailHeader } from './OfferDetailHeader';
import { OfferInfoCard } from './OfferInfoCard';
import { useGetOffer } from '../model/useGetOffer';
import { DetailSkeleton, QueryDisabled, QueryError } from '@/shared/ui';

export default function OfferDetailPage() {
  const { isLoading, data, isEnabled, isError, error, refetch } = useGetOffer();

  if (!isEnabled) {
    return <QueryDisabled path="/dashboard/offers" />;
  }

  if (isError) {
    return <QueryError error={error} onRetry={refetch} />;
  }

  if (isLoading || !data) {
    return <DetailSkeleton cards={[{ rows: 4 }]} tables={0} />;
  }

  const offer = data.data!;

  return (
    <>
      <OfferDetailHeader offer={offer} />
      <OfferInfoCard offer={offer} />
    </>
  );
}
