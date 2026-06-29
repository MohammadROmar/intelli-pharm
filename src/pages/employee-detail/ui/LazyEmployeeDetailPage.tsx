import { lazy } from 'react';

import { DetailSkeleton, WithSuspense } from '@/shared/ui/index.initial';

const EmployeeDetailPage = lazy(() => import('./EmployeeDetailPage'));

export function LazyEmployeeDetailPage() {
  return (
    <WithSuspense
      loader={<DetailSkeleton cards={[{ rows: 4 }, { rows: 2 }]} tables={0} />}
    >
      <EmployeeDetailPage />
    </WithSuspense>
  );
}
