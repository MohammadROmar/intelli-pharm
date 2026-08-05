import { useMemo } from 'react';
import type { TFunction } from 'i18next';

import type { Permission } from '@/shared/api';

import type { PermissionGroup } from '../lib/permissionParser';
import { getResourceLabel } from '../lib/permissionPresentation';
import {
  getViewPermissions,
  isPermissionLocked,
} from '../lib/permissionSelection';
import { PermissionToggle } from './PermissionToggle';

type PermissionGroupPickerProps = {
  group: PermissionGroup;
  moduleLabel: string;
  selected: ReadonlySet<Permission>;
  disabled: boolean;
  onToggle: (permission: Permission, group: PermissionGroup) => void;
  t: TFunction<'permissions'>;
};

export function PermissionGroupPicker({
  group,
  moduleLabel,
  selected,
  disabled,
  onToggle,
  t,
}: PermissionGroupPickerProps) {
  const resourceLabel = getResourceLabel(group.resourceParts, moduleLabel, t);

  const viewPermissions = useMemo(() => getViewPermissions(group), [group]);

  function handleToggle(permission: Permission) {
    onToggle(permission, group);
  }

  return (
    <div className="flex flex-col flex-wrap justify-between gap-3 sm:flex-row sm:items-center">
      <span className="text-foreground text-sm font-medium capitalize">
        {resourceLabel}
      </span>

      <div className="flex flex-wrap gap-1.5">
        {group.actions.map((parsedAction) => (
          <PermissionToggle
            key={parsedAction.permission}
            parsedAction={parsedAction}
            checked={selected.has(parsedAction.permission)}
            disabled={
              disabled ||
              isPermissionLocked(parsedAction.action, viewPermissions, selected)
            }
            onToggle={handleToggle}
            t={t}
          />
        ))}
      </div>
    </div>
  );
}
