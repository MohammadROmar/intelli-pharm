import { lazy } from 'react';

import { DebtListSkeleton } from './DebtListSkeleton';
import { WithSuspense } from '@/shared/ui';

const DebtListPage = lazy(() => import('./DebtListPage'));

function LazyDebtListPage() {
  return (
    <WithSuspense loader={<DebtListSkeleton />}>
      <DebtListPage />
    </WithSuspense>
  );
}

export { LazyDebtListPage as Component };
