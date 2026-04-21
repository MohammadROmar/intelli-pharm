import { lazy } from 'react';

import { Logo, WithSuspense } from '@/shared/ui/index.initial';

const DashboardLayout = lazy(() => import('../layouts/DashboardLayout'));

export default function DashboardRoute() {
  return (
    <WithSuspense
      Component={DashboardLayout}
      loader={
        <div className="flex h-screen items-center justify-center">
          <Logo withColors className="size-12" />
        </div>
      }
    />
  );
}
