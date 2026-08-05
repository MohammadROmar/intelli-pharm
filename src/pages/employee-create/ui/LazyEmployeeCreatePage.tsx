import { lazy } from 'react';

import { WithSuspense, FormSkeleton } from '@/shared/ui/index.initial';

const EmployeeCreatePage = lazy(() => import('./EmployeeCreatePage'));

function LazyEmployeeCreatePage() {
  return (
    <WithSuspense loader={<FormSkeleton cards={[{ rows: 4 }, { rows: 4 }]} />}>
      <EmployeeCreatePage />
    </WithSuspense>
  );
}

export { LazyEmployeeCreatePage as Component };
