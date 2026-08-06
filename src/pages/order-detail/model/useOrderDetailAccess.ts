import { useMemo } from 'react';

import { hasPermission, useGrantedPermissions } from '@/entities/session';

export function useOrderDetailAccess() {
  const grantedPermissions = useGrantedPermissions();

  return useMemo(() => {
    return {
      canChangeStatus: hasPermission(grantedPermissions, 'erp.orders.update'),
      canViewPharmacy: hasPermission(grantedPermissions, 'erp.pharmacies.view'),
      canViewEmployee: hasPermission(grantedPermissions, 'erp.employees.view'),
      canViewOffer: hasPermission(grantedPermissions, 'erp.offers.view'),
      canViewGift: hasPermission(grantedPermissions, 'erp.gifts.view'),
      canViewMedicine: hasPermission(grantedPermissions, 'erp.medicines.view'),
    };
  }, [grantedPermissions]);
}
