import { lazy } from 'react';

import { WithSuspense, FormSkeleton } from '@/shared/ui/index.initial';

const DeliveryAssignPage = lazy(() => import('./DeliveryAssignPage'));

export function LazyDeliveryAssignPage() {
  return (
    <WithSuspense
      Component={DeliveryAssignPage}
      loader={<FormSkeleton cards={[{ rows: 1 }, { rows: 2 }]} />}
    />
  );
}
