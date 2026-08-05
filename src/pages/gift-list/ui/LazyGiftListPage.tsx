import { lazy } from 'react';

import { WithSuspense, TableSkeleton } from '@/shared/ui/index.initial';

const GiftListPage = lazy(() => import('./GiftListPage'));

function LazyGiftListPage() {
  return (
    <WithSuspense loader={<TableSkeleton />}>
      <GiftListPage />
    </WithSuspense>
  );
}

export { LazyGiftListPage as Component };
