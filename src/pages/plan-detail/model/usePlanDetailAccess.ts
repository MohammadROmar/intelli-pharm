import { hasPermission, useGrantedPermissions } from '@/entities/session';

export function usePlanDetailAccess() {
  const granted = useGrantedPermissions();

  return {
    canViewPharmacy: hasPermission(granted, 'erp.pharmacies.view'),
    canViewEmployee: hasPermission(granted, 'erp.employees.view'),
    canViewRegion: hasPermission(granted, 'erp.regions.view'),
  } as const;
}
