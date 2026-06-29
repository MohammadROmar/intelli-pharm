import { lazy } from 'react';

import { AetherSpinner, WithSuspense } from '@/shared/ui/index.initial';

const DashboardLayout = lazy(() => import('../../../layouts/DashboardLayout'));

export function DashboardRoute() {
  return (
    <WithSuspense
      loader={
        <div className="flex h-dvh items-center justify-center">
          <AetherSpinner />
        </div>
      }
    >
      <DashboardLayout />
    </WithSuspense>
  );
}
