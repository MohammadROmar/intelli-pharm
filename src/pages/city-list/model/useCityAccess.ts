import { useMemo } from 'react';

import { hasPermission, useGrantedPermissions } from '@/entities/session';

export function useCityAccess() {
  const grantedPermissions = useGrantedPermissions();

  return useMemo(() => {
    return {
      canCreate: hasPermission(grantedPermissions, 'erp.cities.create'),
      canUpdate: hasPermission(grantedPermissions, 'erp.cities.update'),
      canDelete: hasPermission(grantedPermissions, 'erp.cities.delete'),
    };
  }, [grantedPermissions]);
}
