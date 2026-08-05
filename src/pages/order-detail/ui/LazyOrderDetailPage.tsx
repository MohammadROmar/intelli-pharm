import { lazy } from 'react';

import { WithSuspense, DetailSkeleton } from '@/shared/ui/index.initial';

const OrderDetailPage = lazy(() => import('./OrderDetailPage'));

function LazyOrderDetailPage() {
  return (
    <WithSuspense loader={<DetailSkeleton cards={[{ rows: 4 }]} tables={1} />}>
      <OrderDetailPage />
    </WithSuspense>
  );
}

export { LazyOrderDetailPage as Component };
