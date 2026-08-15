import { hasPermission, useGrantedPermissions } from '@/entities/session';

export function useDeliveryDetailAccess() {
  const granted = useGrantedPermissions();

  return {
    canViewOrder: hasPermission(granted, 'erp.orders.view'),
    canViewPharmacy: hasPermission(granted, 'erp.pharmacies.view'),
    canViewOffer: hasPermission(granted, 'erp.offers.view'),
    canViewEmployee: hasPermission(granted, 'erp.employees.view'),
    canViewGift: hasPermission(granted, 'erp.gifts.view'),
    canViewMedicine: hasPermission(granted, 'erp.medicines.view'),
    canChangeStatus: hasPermission(granted, 'planner.deliveries.update'),
  } as const;
}

export type DeliveryDetailAccess = ReturnType<typeof useDeliveryDetailAccess>;
