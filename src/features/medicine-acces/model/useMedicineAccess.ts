import { useMemo } from 'react';

import { hasPermission, useGrantedPermissions } from '@/entities/session';

export function useMedicineAccess() {
  const grantedPermissions = useGrantedPermissions();

  return useMemo(() => {
    return {
      canCreate: hasPermission(grantedPermissions, 'erp.medicines.create'),
      canUpdate: hasPermission(grantedPermissions, 'erp.medicines.update'),
      canRestock: hasPermission(grantedPermissions, 'erp.stock.update'),
      canDelete: hasPermission(grantedPermissions, 'erp.medicines.delete'),
    };
  }, [grantedPermissions]);
}
