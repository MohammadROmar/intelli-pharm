import type { Permission } from '@/shared/api';

import type { PermissionGroup } from './permissionParser';

export type PermissionSelectionState = {
  selected: ReadonlySet<Permission>;
};

export type PermissionSelectionAction =
  | { type: 'toggle'; permission: Permission; group: PermissionGroup }
  | { type: 'setGroup'; permissions: readonly Permission[]; checked: boolean };

export function getViewPermissions(group: PermissionGroup): Permission[] {
  return group.actions
    .filter((parsedAction) => parsedAction.action === 'view')
    .map((parsedAction) => parsedAction.permission);
}

function allPermissionsOf(group: PermissionGroup): Permission[] {
  return group.actions.map((parsedAction) => parsedAction.permission);
}

export function permissionSelectionReducer(
  state: PermissionSelectionState,
  action: PermissionSelectionAction,
): PermissionSelectionState {
  switch (action.type) {
    case 'toggle': {
      const next = new Set(state.selected);
      const viewPermissions = getViewPermissions(action.group);
      const isViewPermission = viewPermissions.includes(action.permission);
      const isCurrentlySelected = next.has(action.permission);

      if (isCurrentlySelected) {
        next.delete(action.permission);

        const hasAnotherViewPermission = viewPermissions.some((permission) =>
          next.has(permission),
        );

        if (isViewPermission && !hasAnotherViewPermission) {
          for (const permission of allPermissionsOf(action.group)) {
            next.delete(permission);
          }
        }
      } else {
        const isViewGateSatisfied = viewPermissions.some((permission) =>
          next.has(permission),
        );

        if (
          !isViewPermission &&
          viewPermissions.length > 0 &&
          !isViewGateSatisfied
        ) {
          return state;
        }

        next.add(action.permission);
      }

      return { selected: next };
    }

    case 'setGroup': {
      const next = new Set(state.selected);
      for (const permission of action.permissions) {
        if (action.checked) next.add(permission);
        else next.delete(permission);
      }
      return { selected: next };
    }

    default: {
      const exhaustiveCheck: never = action;
      return exhaustiveCheck;
    }
  }
}

export function isPermissionLocked(
  action: string,
  viewPermissions: readonly Permission[],
  selected: ReadonlySet<Permission>,
): boolean {
  if (action === 'view') return false;
  if (viewPermissions.length === 0) return false;

  return !viewPermissions.some((permission) => selected.has(permission));
}
