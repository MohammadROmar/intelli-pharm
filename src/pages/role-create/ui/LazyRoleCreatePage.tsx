import { lazy } from 'react';

import { FormSkeleton, WithSuspense } from '@/shared/ui/index.initial';

const RoleCreatePage = lazy(() => import('./RoleCreatePage'));
const ROLE_FORM_SKELETON_CARDS = [{ rows: 1 }, { rows: 4 }];

export function LazyRoleCreatePage() {
  return (
    <WithSuspense loader={<FormSkeleton cards={ROLE_FORM_SKELETON_CARDS} />}>
      <RoleCreatePage />
    </WithSuspense>
  );
}
