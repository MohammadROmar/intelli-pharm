import { Navigate } from 'react-router';

import { LazyDashboardWelcomePage } from '@/pages/dashboard-welcome';
import { resolveSidebarLandingPath } from '@/widgets/sidebar';
import { useGrantedPermissions } from '@/entities/session';

function DashboardLandingRoute() {
  const granted = useGrantedPermissions();
  const destination = resolveSidebarLandingPath(granted);

  return destination ? (
    <Navigate to={destination} replace />
  ) : (
    <LazyDashboardWelcomePage />
  );
}

export { DashboardLandingRoute as Component };
