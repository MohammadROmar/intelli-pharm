import { lazy } from 'react';

import { WithSuspense, FormSkeleton } from '@/shared/ui/index.initial';

const EmployeeCreatePage = lazy(() => import('./EmployeeCreatePage'));

export function LazyEmployeeCreatePage() {
  return (
    <WithSuspense
      Component={EmployeeCreatePage}
      loader={<FormSkeleton cards={[{ rows: 4 }, { rows: 4 }]} />}
    />
  );
}
