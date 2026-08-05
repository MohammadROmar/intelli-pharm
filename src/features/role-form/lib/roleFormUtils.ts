import type { Permission } from '@/shared/api';
import type { PermissionCatalogModule } from '@/entities/permission';
import type { Role, RoleFormData } from '@/entities/role';

export function getAvailablePermissions(
  catalog: readonly PermissionCatalogModule[],
): Permission[] {
  const permissions = new Set<Permission>();

  for (const moduleEntry of catalog) {
    for (const entry of moduleEntry.permissions) {
      permissions.add(entry.name);
    }
  }

  return Array.from(permissions);
}

export function roleToFormData(
  role: Role | undefined,
  availablePermissions: readonly Permission[],
): RoleFormData {
  const availablePermissionSet = new Set(availablePermissions);

  return {
    name: role?.name ?? '',
    permissions:
      role?.permissions.filter((permission) =>
        availablePermissionSet.has(permission),
      ) ?? [],
  };
}
