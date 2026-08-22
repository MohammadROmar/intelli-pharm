import { useMemo } from 'react';

import { hasPermission, useGrantedPermissions } from '@/entities/session';

export function useOverviewAccess() {
  const grantedPermissions = useGrantedPermissions();

  return useMemo(() => {
    return {
      canViewOrders: hasPermission(grantedPermissions, 'erp.orders.view'),
      canViewLiveTracking: hasPermission(
        grantedPermissions,
        'tracking.view_live',
      ),
      canViewDeliveries: hasPermission(
        grantedPermissions,
        'planner.deliveries.view',
      ),
      canViewMedicines: hasPermission(grantedPermissions, 'erp.medicines.view'),
      canViewPlans: hasPermission(grantedPermissions, 'planner.plan.view'),
      canViewTargets: hasPermission(grantedPermissions, 'erp.targets.view'),
    };
  }, [grantedPermissions]);
}
