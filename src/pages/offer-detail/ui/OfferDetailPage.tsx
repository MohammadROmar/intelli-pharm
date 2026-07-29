import { useParams } from 'react-router';

import { OfferDetailHeader } from './OfferDetailHeader';
import { OfferInfoCard } from './OfferInfoCard';
import { useGetOfferSuspense } from '../model/useGetOfferSuspense';
import { QueryDisabled, QueryErrorBoundary } from '@/shared/ui';

export default function OfferDetailPage() {
  const { id } = useParams<{ id: string }>();
  const offerId = Number(id);

  if (!id || Number.isNaN(offerId)) {
    return <QueryDisabled path="/dashboard/offers" />;
  }

  return (
    <QueryErrorBoundary>
      <OfferDetailContent offerId={offerId} />
    </QueryErrorBoundary>
  );
}

type OfferDetailContentProps = { offerId: number };

function OfferDetailContent({ offerId }: OfferDetailContentProps) {
  const { data } = useGetOfferSuspense(offerId);

  const offer = data.data!;

  return (
    <>
      <OfferDetailHeader offer={offer} />
      <OfferInfoCard offer={offer} />
    </>
  );
}
