import { useParams } from 'react-router';

import { GiftInfoCard } from './GiftInfoCard';
import { GiftDetailHeader } from './GiftDetailHeader';
import { useGetGiftSuspense } from '../model/useGetGiftSuspense';
import { hasPermission, useGrantedPermissions } from '@/entities/session';
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
  const grantedPermissions = useGrantedPermissions();

  const canViewMedicine = hasPermission(
    grantedPermissions,
    'erp.medicines.view',
  );

  const gift = data.data!;

  return (
    <>
      <GiftDetailHeader gift={gift} />
      <GiftInfoCard gift={gift} canViewMedicine={canViewMedicine} />
    </>
  );
}
