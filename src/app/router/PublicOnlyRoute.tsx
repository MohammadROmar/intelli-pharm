import { PublicRoute } from '@/features/auth';
import { Outlet } from 'react-router-dom';

export default function PublicOnlyRoute() {
  return (
    <PublicRoute>
      <Outlet />
    </PublicRoute>
  );
}
