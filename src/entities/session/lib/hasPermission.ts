import type { Permission, PermissionRequirement } from '@/shared/api';

export function hasPermission(granted: ReadonlySet<Permission>, required: Permission): boolean {
  return granted.has(required);
}

export function hasAnyPermission(
  granted: ReadonlySet<Permission>,
  required: readonly Permission[],
): boolean {
  return required.length === 0 || required.some((permission) => granted.has(permission));
}

export function hasAllPermissions(
  granted: ReadonlySet<Permission>,
  required: readonly Permission[],
): boolean {
  return required.every((permission) => granted.has(permission));
}

export function hasPermissionRequirement(
  granted: ReadonlySet<Permission>,
  requirement: PermissionRequirement,
): boolean {
  return typeof requirement === 'string'
    ? hasPermission(granted, requirement)
    : hasAnyPermission(granted, requirement);
}

export function hasAllPermissionRequirements(
  granted: ReadonlySet<Permission>,
  requirements: readonly PermissionRequirement[],
): boolean {
  return requirements.every((requirement) => hasPermissionRequirement(granted, requirement));
}
