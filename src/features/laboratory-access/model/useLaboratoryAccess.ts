import { useMemo } from 'react';

import { hasPermission, useGrantedPermissions } from '@/entities/session';

export function useLaboratoryAccess() {
  const grantedPermissions = useGrantedPermissions();

  return useMemo(() => {
    return {
      canCreate: hasPermission(grantedPermissions, 'erp.laboratories.create'),
      canUpdate: hasPermission(grantedPermissions, 'erp.laboratories.update'),
      canDelete: hasPermission(grantedPermissions, 'erp.laboratories.delete'),
    };
  }, [grantedPermissions]);
}
