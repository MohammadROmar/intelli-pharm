import { useMemo } from 'react';

import { hasPermission, useGrantedPermissions } from '@/entities/session';

export function useRoleAccess() {
  const grantedPermissions = useGrantedPermissions();

  return useMemo(() => {
    return {
      canCreate: hasPermission(grantedPermissions, 'auth.roles.create'),
      canUpdate: hasPermission(grantedPermissions, 'auth.roles.update'),
      canDelete: hasPermission(grantedPermissions, 'auth.roles.delete'),
    };
  }, [grantedPermissions]);
}
