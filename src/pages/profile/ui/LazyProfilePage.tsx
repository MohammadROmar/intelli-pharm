import { lazy } from 'react';

import { WithSuspense } from '@/shared/ui/index.initial';
import { ProfilePageSkeleton } from './ProfilePageSkeleton';

const ProfilePage = lazy(() => import('./ProfilePage'));

function LazyProfilePage() {
  return (
    <WithSuspense loader={<ProfilePageSkeleton />}>
      <ProfilePage />
    </WithSuspense>
  );
}

export { LazyProfilePage as Component };
