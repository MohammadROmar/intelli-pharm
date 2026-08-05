import { lazy } from 'react';

import { LoginSkeleton } from './LoginPageSkeleton';
import { WithSuspense } from '@/shared/ui/index.initial';

const LoginPage = lazy(() => import('./LoginPage'));

function LazyLoginPage() {
  return (
    <WithSuspense loader={<LoginSkeleton />}>
      <LoginPage />
    </WithSuspense>
  );
}

export { LazyLoginPage as Component };
