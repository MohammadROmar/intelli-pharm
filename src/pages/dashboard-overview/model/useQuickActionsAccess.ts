import { useMemo } from 'react';
import { Cross, Pill, Route as RouteIcon, UserPlus } from 'lucide-react';

import { hasPermission, useGrantedPermissions } from '@/entities/session';

const ACTIONS = [
  {
    to: '/dashboard/pharmacies/new',
    icon: Cross,
    key: 'newPharmacy',
    permission: 'erp.pharmacies.create',
  },
  {
    to: '/dashboard/employees/new',
    icon: UserPlus,
    key: 'newEmployee',
    permission: 'erp.employees.create',
  },
  {
    to: '/dashboard/plans/initiate',
    icon: RouteIcon,
    key: 'initiatePlan',
    permission: 'planner.rep.plan.generate',
  },
  {
    to: '/dashboard/medicines/new',
    icon: Pill,
    key: 'newMedicine',
    permission: 'erp.medicines.create',
  },
] as const;

export function useQuickActionsAccess() {
  const grantedPermissions = useGrantedPermissions();

  return useMemo(
    () =>
      ACTIONS.filter((action) =>
        hasPermission(grantedPermissions, action.permission),
      ),
    [grantedPermissions],
  );
}
