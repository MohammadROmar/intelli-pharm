import { Outlet } from 'react-router-dom';

import { PublicRoute } from '@/features/auth/index.initial';

export default function PublicOnlyRoute() {
  return (
    <PublicRoute>
      <Outlet />
    </PublicRoute>
  );
}
