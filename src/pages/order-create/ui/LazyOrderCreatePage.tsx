import { lazy } from 'react';

import { WithSuspense } from '@/shared/ui/index.initial';

import { OrderCreatePageSkeleton } from './OrderCreatePageSkeleton';

const OrderCreatePage = lazy(() => import('./OrderCreatePage'));

function LazyOrderCreatePage() {
  return (
    <WithSuspense loader={<OrderCreatePageSkeleton />}>
      <OrderCreatePage />
    </WithSuspense>
  );
}

export { LazyOrderCreatePage as Component };
