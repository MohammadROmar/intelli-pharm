import { createSelector } from '@reduxjs/toolkit';

import { useAppSelector } from '@/shared/config';
import type { Permission } from '@/shared/api';

import { hasPermission } from '../lib/hasPermission';

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
