import { useParams } from 'react-router-dom';

import { GiftInfoCard } from './GiftInfoCard';
import { GiftDetailHeader } from './GiftDetailHeader';
import { useGetGiftSuspense } from '../model/useGetGiftSuspense';
import { QueryDisabled, QueryErrorBoundary } from '@/shared/ui';

export default function GiftDetailPage() {
  const { id } = useParams<{ id: string }>();
  const giftId = Number(id);

  if (!id || Number.isNaN(giftId)) {
    return <QueryDisabled path="/dashboard/categories" />;
  }

  return (
    <QueryErrorBoundary>
      <GiftDetailContent giftId={giftId} />
    </QueryErrorBoundary>
  );
}

type GiftDetailContentProps = { giftId: number };

function GiftDetailContent({ giftId }: GiftDetailContentProps) {
  const { data } = useGetGiftSuspense(giftId);

  const gift = data.data!;

  return (
    <>
      <GiftDetailHeader gift={gift} />
      <GiftInfoCard gift={gift} />
    </>
  );
}
