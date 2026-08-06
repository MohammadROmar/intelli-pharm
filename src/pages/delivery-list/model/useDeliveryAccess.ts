import { useMemo } from 'react';

import { hasPermission, useGrantedPermissions } from '@/entities/session';

export function useDeliveryAccess() {
  const grantedPermissions = useGrantedPermissions();

  return useMemo(() => {
    return {
      canCreate: hasPermission(grantedPermissions, 'planner.deliveries.create'),
      canUpdate: hasPermission(grantedPermissions, 'planner.deliveries.update'),
    };
  }, [grantedPermissions]);
}
