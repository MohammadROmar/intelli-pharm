import { lazy } from 'react';

import { WithSuspense, FormSkeleton } from '@/shared/ui/index.initial';

const EmployeeEditPage = lazy(() => import('./EmployeeEditPage'));

function LazyEmployeeEditPage() {
  return (
    <WithSuspense loader={<FormSkeleton cards={[{ rows: 3 }, { rows: 4 }]} />}>
      <EmployeeEditPage />
    </WithSuspense>
  );
}

export { LazyEmployeeEditPage as Component };
