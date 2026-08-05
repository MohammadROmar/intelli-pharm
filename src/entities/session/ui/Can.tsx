import type { ReactNode } from 'react';

import type { PermissionRequirement } from '@/shared/api';

import { useHasAnyPermission } from '../model/useHasPermission';

type CanProps = {
  permission: PermissionRequirement;
  fallback?: ReactNode;
  children: ReactNode;
};

export function Can({ permission, fallback = null, children }: CanProps) {
  const allowed = useHasAnyPermission(permission);
  return allowed ? children : fallback;
}
