import { lazy } from 'react';

import { WithSuspense, FormSkeleton } from '@/shared/ui/index.initial';

const EmployeeEditPage = lazy(() => import('./EmployeeEditPage'));

export function LazyEmployeeEditPage() {
  return (
    <WithSuspense
      Component={EmployeeEditPage}
      loader={<FormSkeleton fields={3} />}
    />
  );
}
