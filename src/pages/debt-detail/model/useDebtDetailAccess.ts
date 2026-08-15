import { useMemo } from 'react';

import { hasPermission, useGrantedPermissions } from '@/entities/session';

export function useDebtDetailAccess() {
  const grantedPermissions = useGrantedPermissions();

  return useMemo(
    () => ({
      canViewEmployee: hasPermission(grantedPermissions, 'erp.employees.view'),
      canViewOffer: hasPermission(grantedPermissions, 'erp.offers.view'),
      canViewOrder: hasPermission(grantedPermissions, 'erp.orders.view'),
      canViewPharmacy: hasPermission(grantedPermissions, 'erp.pharmacies.view'),
    }),
    [grantedPermissions],
  );
}
