import { useMemo } from 'react';

import { hasPermission, useGrantedPermissions } from '@/entities/session';

export function useSeasonalMetricsAccess() {
  const grantedPermissions = useGrantedPermissions();

  return useMemo(() => {
    return {
      canViewPharmacy: hasPermission(grantedPermissions, 'erp.pharmacies.view'),
      canViewCategory: hasPermission(grantedPermissions, 'erp.categories.view'),
    };
  }, [grantedPermissions]);
}
