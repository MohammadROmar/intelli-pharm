import { useMemo } from 'react';

import { hasPermission, useGrantedPermissions } from '@/entities/session';

export function useOfferAccess() {
  const grantedPermissions = useGrantedPermissions();

  return useMemo(() => {
    return {
      canCreate: hasPermission(grantedPermissions, 'erp.offers.create'),
      canUpdate: hasPermission(grantedPermissions, 'erp.offers.update'),
      canDelete: hasPermission(grantedPermissions, 'erp.offers.delete'),
    };
  }, [grantedPermissions]);
}
