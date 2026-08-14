import { useMemo } from 'react';

import { hasPermission, useGrantedPermissions } from '@/entities/session';

export function useMedicineFormAccess() {
  const grantedPermissions = useGrantedPermissions();

  return useMemo(() => {
    return {
      canViewCategories: hasPermission(
        grantedPermissions,
        'erp.categories.view',
      ),
      canViewLaboratories: hasPermission(
        grantedPermissions,
        'erp.laboratories.view',
      ),
    };
  }, [grantedPermissions]);
}
