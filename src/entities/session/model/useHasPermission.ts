import { createSelector } from '@reduxjs/toolkit';

import { useAppSelector } from '@/shared/config';
import type { Permission, PermissionRequirement } from '@/shared/api';

import { hasPermission, hasPermissionRequirement } from '../lib/hasPermission';

const selectPermissions = (state: RootState) => state.session.permissions;

const selectPermissionSet = createSelector(
  [selectPermissions],
  (permissions): ReadonlySet<Permission> => new Set(permissions),
);

export function useGrantedPermissions(): ReadonlySet<Permission> {
  return useAppSelector(selectPermissionSet);
}

export function useHasPermission(required: Permission): boolean {
  return useAppSelector((state) =>
    hasPermission(selectPermissionSet(state), required),
  );
}

export function useHasAnyPermission(required: PermissionRequirement): boolean {
  return useAppSelector((state) =>
    hasPermissionRequirement(selectPermissionSet(state), required),
  );
}
