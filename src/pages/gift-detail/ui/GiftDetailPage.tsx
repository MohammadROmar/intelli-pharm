import { useParams } from 'react-router';

import { useHasPermission } from '@/entities/session';
import { QueryDisabled, QueryErrorBoundary } from '@/shared/ui';

import { GiftInfoCard } from './GiftInfoCard';
import { GiftDetailHeader } from './GiftDetailHeader';
import { useGetGiftSuspense } from '../model/useGetGiftSuspense';

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

  const canViewMedicine = useHasPermission('erp.medicines.view');

  const gift = data.data!;

  return (
    <>
      <GiftDetailHeader gift={gift} />
      <GiftInfoCard gift={gift} canViewMedicine={canViewMedicine} />
    </>
  );
}
