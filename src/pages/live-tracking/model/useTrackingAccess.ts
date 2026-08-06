import { useMemo } from 'react';

import { hasPermission, useGrantedPermissions } from '@/entities/session';

export function useTrackingAccess() {
  const grantedPermissions = useGrantedPermissions();

  return useMemo(() => {
    return {
      canViewEmployee: hasPermission(grantedPermissions, 'erp.employees.view'),
      canViewPlan: hasPermission(grantedPermissions, 'planner.plan.view'),
    };
  }, [grantedPermissions]);
}
