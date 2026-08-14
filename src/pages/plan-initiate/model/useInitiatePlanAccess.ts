import { useMemo } from 'react';

import { hasPermission, useGrantedPermissions } from '@/entities/session';

export function useInitiatePlanAccess() {
  const grantedPermissions = useGrantedPermissions();

  return useMemo(() => {
    return {
      canViewEmployees: hasPermission(grantedPermissions, 'erp.employees.view'),
      canViewPharmacies: hasPermission(
        grantedPermissions,
        'erp.pharmacies.view',
      ),
      canViewRegions: hasPermission(grantedPermissions, 'erp.regions.view'),
    };
  }, [grantedPermissions]);
}
