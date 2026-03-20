import { lazy } from 'react';

import DashboardSkeleton from './DashboardLayoutSkeleton';
import { LoginSkeleton } from '@/pages/login';
import { useAppSelector } from '@/shared/config';
import { WithSuspense } from '@/shared/ui/index.initial';

const RootLayout = lazy(() => import('./RootLayout'));

export function LazyRootLayout() {
  const { refreshToken } = useAppSelector((state) => state.session);

  return (
    <WithSuspense
      Component={RootLayout}
      loader={refreshToken ? <DashboardSkeleton /> : <LoginSkeleton />}
    />
  );
}
