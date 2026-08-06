import { useMemo } from 'react';

import { hasPermission, useGrantedPermissions } from '@/entities/session';

export function useEmployeeAccess() {
  const grantedPermissions = useGrantedPermissions();

  return useMemo(() => {
    return {
      canCreate: hasPermission(grantedPermissions, 'erp.employees.create'),
      canUpdate: hasPermission(grantedPermissions, 'erp.employees.update'),
      canDeactivate: hasPermission(
        grantedPermissions,
        'erp.employees.deactivate',
      ),
    };
  }, [grantedPermissions]);
}
