import { useMemo } from 'react';

import { hasPermission, useGrantedPermissions } from '@/entities/session';

export function useRegionAccess() {
  const grantedPermissions = useGrantedPermissions();

  return useMemo(() => {
    return {
      canCreate: hasPermission(grantedPermissions, 'erp.regions.create'),
      canUpdate: hasPermission(grantedPermissions, 'erp.regions.update'),
      canDelete: hasPermission(grantedPermissions, 'erp.regions.delete'),
    };
  }, [grantedPermissions]);
}
