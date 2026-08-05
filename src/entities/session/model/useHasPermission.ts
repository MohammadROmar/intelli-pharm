import { createSelector } from '@reduxjs/toolkit';

import { useAppSelector } from '@/shared/config';
import type { Permission, PermissionRequirement } from '@/shared/api';

import { hasAnyPermission, hasPermission } from '../lib/hasPermission';

const selectPermissions = (state: RootState) => state.session.permissions;

const selectPermissionSet = createSelector(
  [selectPermissions],
  (permissions): ReadonlySet<Permission> => new Set(permissions),
);

export function useGrantedPermissions(): ReadonlySet<Permission> {
  return useAppSelector(selectPermissionSet);
}

export function useHasPermission(required: Permission): boolean {
  const granted = useGrantedPermissions();
  return hasPermission(granted, required);
}

export function useHasAnyPermission(required: PermissionRequirement): boolean {
  const granted = useGrantedPermissions();
  return hasAnyPermission(
    granted,
    Array.isArray(required) ? required : [required],
  );
}
