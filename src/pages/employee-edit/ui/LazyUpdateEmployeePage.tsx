import { lazy } from 'react';

import { WithSuspense, FormSkeleton } from '@/shared/ui/index.initial';

const UpdateEmployeePage = lazy(() => import('./UpdateEmployeePage'));

export function LazyUpdateEmployeePage() {
  return (
    <WithSuspense
      Component={UpdateEmployeePage}
      loader={<FormSkeleton fields={3} />}
    />
  );
}
