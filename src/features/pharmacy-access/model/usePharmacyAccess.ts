import { useMemo } from 'react';

import { hasPermission, useGrantedPermissions } from '@/entities/session';

export function usePharmacyAccess() {
  const grantedPermissions = useGrantedPermissions();

  return useMemo(() => {
    return {
      canCreate: hasPermission(grantedPermissions, 'erp.pharmacies.create'),
      canUpdate: hasPermission(grantedPermissions, 'erp.pharmacies.update'),
      canDelete: hasPermission(grantedPermissions, 'erp.pharmacies.delete'),
    };
  }, [grantedPermissions]);
}
