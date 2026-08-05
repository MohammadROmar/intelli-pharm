import { lazy } from 'react';

import { DetailSkeleton, WithSuspense } from '@/shared/ui/index.initial';

const RoleDetailPage = lazy(() => import('./RoleDetailPage'));

function LazyRoleDetailPage() {
  return (
    <WithSuspense
      loader={<DetailSkeleton cards={[{ rows: 2 }, { rows: 3 }]} tables={0} />}
    >
      <RoleDetailPage />
    </WithSuspense>
  );
}

export { LazyRoleDetailPage as Component };
