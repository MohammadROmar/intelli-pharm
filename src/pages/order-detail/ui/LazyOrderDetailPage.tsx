import { lazy } from 'react';

import { WithSuspense, DetailSkeleton } from '@/shared/ui/index.initial';

const OrderDetailPage = lazy(() => import('./OrderDetailPage'));

export function LazyOrderDetailPage() {
  return (
    <WithSuspense
      Component={OrderDetailPage}
      loader={<DetailSkeleton cards={[{ rows: 4 }]} tables={1} />}
    />
  );
}
