import { lazy } from 'react';

import { FormSkeleton, WithSuspense } from '@/shared/ui/index.initial';

const RoleEditPage = lazy(() => import('./RoleEditPage'));
const ROLE_FORM_SKELETON_CARDS = [{ rows: 1 }, { rows: 4 }];

export function LazyRoleEditPage() {
  return (
    <WithSuspense loader={<FormSkeleton cards={ROLE_FORM_SKELETON_CARDS} />}>
      <RoleEditPage />
    </WithSuspense>
  );
}
