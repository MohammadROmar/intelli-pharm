import { lazy } from 'react';

import { WithSuspense, TableSkeleton } from '@/shared/ui/index.initial';

const OfferListPage = lazy(() => import('./OfferListPage'));

export function LazyOfferListPage() {
  return (
    <WithSuspense loader={<TableSkeleton />}>
      <OfferListPage />
    </WithSuspense>
  );
}
