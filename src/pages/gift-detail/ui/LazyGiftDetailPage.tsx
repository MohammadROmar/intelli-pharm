import { lazy } from 'react';

import { DetailSkeleton, WithSuspense } from '@/shared/ui/index.initial';

const GiftDetailPage = lazy(() => import('./GiftDetailPage'));

export function LazyGiftDetailPage() {
  return (
    <WithSuspense loader={<DetailSkeleton cards={[{ rows: 3 }]} tables={0} />}>
      <GiftDetailPage />
    </WithSuspense>
  );
}
