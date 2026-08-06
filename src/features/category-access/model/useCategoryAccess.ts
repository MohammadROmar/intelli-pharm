import { useMemo } from 'react';

import { hasPermission, useGrantedPermissions } from '@/entities/session';

export function useCategoryAccess() {
  const grantedPermissions = useGrantedPermissions();

  return useMemo(() => {
    return {
      canCreate: hasPermission(grantedPermissions, 'erp.categories.create'),
      canUpdate: hasPermission(grantedPermissions, 'erp.categories.update'),
      canDelete: hasPermission(grantedPermissions, 'erp.categories.delete'),
    };
  }, [grantedPermissions]);
}
