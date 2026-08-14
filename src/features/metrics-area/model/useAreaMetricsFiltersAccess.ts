import { useMemo } from 'react';

import { hasPermission, useGrantedPermissions } from '@/entities/session';

export function useAreaMetricsFiltersAccess() {
  const grantedPermissions = useGrantedPermissions();

  return useMemo(() => {
    return {
      canFilterByCategories: hasPermission(
        grantedPermissions,
        'erp.categories.view',
      ),
      canFilterByRegions: hasPermission(grantedPermissions, 'erp.regions.view'),
    };
  }, [grantedPermissions]);
}
