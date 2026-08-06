import { hasPermission, useGrantedPermissions } from '@/entities/session';

export function usePlanButtonAccess() {
  const granted = useGrantedPermissions();

  return {
    canInitiateFromReps: hasPermission(granted, 'planner.rep.plan.generate'),
    canInitiateFromDeliveries: hasPermission(
      granted,
      'planner.distributor.plan.generate',
    ),
  } as const;
}
