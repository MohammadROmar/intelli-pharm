import type { Permission } from '@/shared/api';
import type { PermissionCatalog } from '@/entities/permission';
import type { Role, RoleFormData } from '@/entities/role';

function isDashboardPermission(permission: Permission): boolean {
  return !permission.endsWith('.own');
}

export function getAvailablePermissions(
  catalog: readonly PermissionCatalog[],
): Permission[] {
  return [
    ...new Set(catalog.map(({ name }) => name).filter(isDashboardPermission)),
  ];
}

export function roleToFormData(
  role: Role | undefined,
  availablePermissions: readonly Permission[],
): RoleFormData {
  const availablePermissionSet = new Set(
    availablePermissions.filter(isDashboardPermission),
  );

  return {
    name: role?.name ?? '',
    permissions:
      role?.permissions.filter((permission) =>
        availablePermissionSet.has(permission),
      ) ?? [],
  };
}
