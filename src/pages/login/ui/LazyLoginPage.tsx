import { lazy } from 'react';

import LoginSkeleton from './LoginPageSkeleton';
import { WithSuspense } from '@/shared/ui';

const LoginPage = lazy(() => import('./LoginPage'));

export function LoginPageLazy() {
  return <WithSuspense Component={LoginPage} loader={<LoginSkeleton />} />;
}
