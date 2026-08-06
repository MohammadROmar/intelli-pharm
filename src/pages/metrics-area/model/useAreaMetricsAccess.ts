import { useMemo } from 'react';

import { hasPermission, useGrantedPermissions } from '@/entities/session';

export function useAreaMetricsAccess() {
  const grantedPermissions = useGrantedPermissions();

  return useMemo(() => {
    return {
      canViewRegion: hasPermission(grantedPermissions, 'erp.regions.view'),
      canViewCategory: hasPermission(grantedPermissions, 'erp.categories.view'),
    };
  }, [grantedPermissions]);
}
