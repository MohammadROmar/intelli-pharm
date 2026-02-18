import { Outlet } from 'react-router-dom';

import { PublicRoute } from '@/features/auth';

export default function PublicOnlyRoute() {
  return (
    <PublicRoute>
      <Outlet />
    </PublicRoute>
  );
}
