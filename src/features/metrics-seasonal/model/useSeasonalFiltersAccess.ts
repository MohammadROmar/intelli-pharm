import { useMemo } from 'react';

import { hasPermission, useGrantedPermissions } from '@/entities/session';

export function useSeasonalFiltersAccess() {
  const grantedPermissions = useGrantedPermissions();

  return useMemo(() => {
    return {
      canFilterByCategories: hasPermission(
        grantedPermissions,
        'erp.categories.view',
      ),
      canFilterByPharmacies: hasPermission(
        grantedPermissions,
        'erp.pharmacies.view',
      ),
    };
  }, [grantedPermissions]);
}
