import { useMemo } from 'react';

import { hasPermission, useGrantedPermissions } from '@/entities/session';

export function useGiftAccess() {
  const grantedPermissions = useGrantedPermissions();

  return useMemo(() => {
    return {
      canCreate: hasPermission(grantedPermissions, 'erp.gifts.create'),
      canUpdate: hasPermission(grantedPermissions, 'erp.gifts.update'),
      canDelete: hasPermission(grantedPermissions, 'erp.gifts.delete'),
    };
  }, [grantedPermissions]);
}
