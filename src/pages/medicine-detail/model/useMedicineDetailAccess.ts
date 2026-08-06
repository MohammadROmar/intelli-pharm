import { useMemo } from 'react';

import { hasPermission, useGrantedPermissions } from '@/entities/session';

export function useMedicineDetailAccess() {
  const grantedPermissions = useGrantedPermissions();

  return useMemo(() => {
    return {
      canViewCategory: hasPermission(grantedPermissions, 'erp.categories.view'),
      canViewLaboratory: hasPermission(
        grantedPermissions,
        'erp.laboratories.view',
      ),
    };
  }, [grantedPermissions]);
}
