import { lazy } from 'react';

import DashboardSkeleton from '../layouts/DashboardLayoutSkeleton';
import { ProtectedRoute } from '@/features/auth/index.initial';
import { WithSuspense } from '@/shared/ui/index.initial';

const DashboardLayout = lazy(() => import('../layouts/DashboardLayout'));

export default function DashboardRoute() {
  return (
    <ProtectedRoute>
      <WithSuspense
        Component={DashboardLayout}
        loader={<DashboardSkeleton />}
      />
    </ProtectedRoute>
  );
}
