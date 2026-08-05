import type { Permission } from '@/shared/api';

export type ParsedAction = {
  permission: Permission;
  action: string;
  scope?: string;
};

export type PermissionGroup = {
  module: string;
  resourceParts: string[];
  actions: ParsedAction[];
};

const SCOPE_SUFFIXES = new Set(['own']);

export function parsePermission(permission: Permission) {
  const [module = '', ...segments] = permission.split('.');
  let rest = segments;

  let scope: string | undefined;
  const lastSegment = rest[rest.length - 1];
  if (
    rest.length >= 2 &&
    lastSegment !== undefined &&
    SCOPE_SUFFIXES.has(lastSegment)
  ) {
    scope = lastSegment;
    rest = rest.slice(0, -1);
  }

  const action = rest[rest.length - 1] ?? '';
  const resourceParts = rest.slice(0, -1);

  return { module, resourceParts, action, scope };
}

export function groupPermissionsByModule(
  permissions: readonly Permission[],
): Map<string, PermissionGroup[]> {
  const groups = new Map<string, PermissionGroup>();

  for (const permission of permissions) {
    const { module, resourceParts, action, scope } =
      parsePermission(permission);
    const key = `${module}::${resourceParts.join('.')}`;

    let group = groups.get(key);
    if (!group) {
      group = { module, resourceParts, actions: [] };
      groups.set(key, group);
    }
    group.actions.push({ permission, action, scope });
  }

  const byModule = new Map<string, PermissionGroup[]>();
  for (const group of groups.values()) {
    const existing = byModule.get(group.module);
    if (existing) {
      existing.push(group);
    } else {
      byModule.set(group.module, [group]);
    }
  }

  return byModule;
}
