import { lazy } from 'react';

import DashboardSkeleton from '../layouts/DashboardLayoutSkeleton';
import { WithSuspense } from '@/shared/ui/index.initial';

const DashboardLayout = lazy(() => import('../layouts/DashboardLayout'));

export default function DashboardRoute() {
  return (
    <WithSuspense Component={DashboardLayout} loader={<DashboardSkeleton />} />
  );
}
