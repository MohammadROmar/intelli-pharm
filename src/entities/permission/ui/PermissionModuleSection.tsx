import { useCallback, useMemo } from 'react';
import type { TFunction } from 'i18next';

import type { Permission } from '@/shared/api';
import { cn } from '@/shared/lib';
import { Separator } from '@/shared/ui';

import { Checkbox } from './Checkbox';
import { PermissionGroupPicker } from './PermissionGroupPicker';
import type { PermissionGroup } from '../lib/permissionParser';
import { getModuleLabel } from '../lib/permissionPresentation';

type PermissionModuleSectionProps = {
  module: string;
  groups: PermissionGroup[];
  selected: ReadonlySet<Permission>;
  disabled: boolean;
  onToggle: (permission: Permission, group: PermissionGroup) => void;
  onToggleGroup: (permissions: readonly Permission[], checked: boolean) => void;
  showSeparator: boolean;
  t: TFunction<'permissions'>;
};

export function PermissionModuleSection({
  module,
  groups,
  selected,
  disabled,
  onToggle,
  onToggleGroup,
  showSeparator,
  t,
}: PermissionModuleSectionProps) {
  const moduleLabel = getModuleLabel(module, t);

  const allPermissionsInModule = useMemo(
    () =>
      groups.flatMap((group) =>
        group.actions.map((parsedAction) => parsedAction.permission),
      ),
    [groups],
  );

  const selectedCount = useMemo(
    () =>
      allPermissionsInModule.filter((permission) => selected.has(permission))
        .length,
    [allPermissionsInModule, selected],
  );

  const allSelected =
    selectedCount > 0 && selectedCount === allPermissionsInModule.length;
  const someSelected = selectedCount > 0 && !allSelected;

  const handleSelectAll = useCallback(
    () => onToggleGroup(allPermissionsInModule, !allSelected),
    [onToggleGroup, allPermissionsInModule, allSelected],
  );

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <p className="text-muted-foreground text-[11px] font-semibold tracking-widest uppercase">
          {moduleLabel}
        </p>

        <label
          className={cn(
            'text-muted-foreground flex items-center gap-1.5 text-[11px]',
            disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer',
          )}
        >
          <Checkbox
            checked={someSelected ? 'indeterminate' : allSelected}
            disabled={disabled}
            onCheckedChange={handleSelectAll}
            className="size-3.5 cursor-pointer shadow-none"
          />
          <span>
            {selectedCount}/{allPermissionsInModule.length}
          </span>
        </label>
      </div>

      <div className="space-y-5 sm:space-y-3">
        {groups.map((group) => (
          <PermissionGroupPicker
            key={group.resourceParts.join('.') || '__root__'}
            group={group}
            moduleLabel={moduleLabel}
            selected={selected}
            disabled={disabled}
            onToggle={onToggle}
            t={t}
          />
        ))}
      </div>

      {showSeparator && <Separator className="mt-6" />}
    </div>
  );
}
