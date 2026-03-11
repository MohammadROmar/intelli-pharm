import { lazy } from 'react';

import { WithSuspense, FormSkeleton } from '@/shared/ui';

const EmployeeCreatePage = lazy(() => import('./EmployeeCreatePage'));

export function LazyEmployeeCreatePage() {
  return (
    <WithSuspense
      Component={EmployeeCreatePage}
      loader={<FormSkeleton fields={4} />}
    />
  );
}
