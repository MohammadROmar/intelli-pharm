import { lazy } from 'react';

import { LoginSkeleton } from './LoginPageSkeleton';
import { WithSuspense } from '@/shared/ui/index.initial';

const LoginPage = lazy(() => import('./LoginPage'));

export function LazyLoginPage() {
  return <WithSuspense Component={LoginPage} loader={<LoginSkeleton />} />;
}
