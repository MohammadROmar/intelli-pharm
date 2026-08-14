import { useMemo } from 'react';

import { hasPermission, useGrantedPermissions } from '@/entities/session';

export function useOrdersAccess() {
  const grantedPermissions = useGrantedPermissions();

  return useMemo(() => {
    return {
      canCancel: hasPermission(grantedPermissions, 'erp.orders.cancel'),
      canChangeStatus: hasPermission(grantedPermissions, 'erp.orders.update'),
    };
  }, [grantedPermissions]);
}
