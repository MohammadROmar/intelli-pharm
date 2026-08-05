import {
  useCallback,
  useDeferredValue,
  useMemo,
  useState,
  type ChangeEvent,
} from 'react';
import { useTranslation } from 'react-i18next';
import { Search } from 'lucide-react';

import type { Permission } from '@/shared/api';
import { cn } from '@/shared/lib';
import { Input } from '@/shared/ui';

import {
  groupPermissionsByModule,
  type PermissionGroup,
} from '../lib/permissionParser';
import {
  getActionPresentation,
  getModuleLabel,
  getResourceLabel,
} from '../lib/permissionPresentation';
import { normalizeSearchTerm } from '../lib/permissionSearch';
import { permissionSelectionReducer } from '../lib/permissionSelection';
import { PermissionModuleSection } from './PermissionModuleSection';

type PermissionPickerProps = {
  permissions: readonly Permission[];
  selected: ReadonlySet<Permission>;
  disabled?: boolean;
  onChange: (permissions: Permission[]) => void;
};

type SearchableGroup = { group: PermissionGroup; searchText: string };

export function PermissionPicker({
  permissions,
  selected,
  disabled = false,
  onChange,
}: PermissionPickerProps) {
  const { t: tPicker, i18n } = useTranslation('permissions', {
    keyPrefix: 'picker',
  });
  const language = i18n.resolvedLanguage ?? i18n.language;

  const t = useMemo(
    () => i18n.getFixedT(language, 'permissions'),
    [i18n, language],
  );

  const [searchTerm, setSearchTerm] = useState('');
  const deferredSearchTerm = useDeferredValue(searchTerm);
  const isStale = searchTerm !== deferredSearchTerm;

  const byModule = useMemo(
    () => groupPermissionsByModule(permissions),
    [permissions],
  );

  const searchableByModule = useMemo(() => {
    const result = new Map<string, SearchableGroup[]>();

    for (const [module, groups] of byModule) {
      const moduleLabel = getModuleLabel(module, t);

      const searchableGroups = groups.map((group) => {
        const resourceLabel = getResourceLabel(
          group.resourceParts,
          moduleLabel,
          t,
        );
        const actionLabels = group.actions.flatMap((parsedAction) => {
          const { label, scopeLabel } = getActionPresentation(parsedAction, t);

          return [parsedAction.permission, label, scopeLabel ?? ''];
        });
        const searchText = [module, moduleLabel, resourceLabel, ...actionLabels]
          .join(' ')
          .toLowerCase();

        return { group, searchText };
      });

      result.set(module, searchableGroups);
    }

    return result;
  }, [byModule, t]);

  const visibleByModule = useMemo(() => {
    const term = normalizeSearchTerm(deferredSearchTerm);
    if (!term) return byModule;

    const visible = new Map<string, PermissionGroup[]>();

    for (const [module, searchableGroups] of searchableByModule) {
      const matchingGroups = searchableGroups.flatMap(
        ({ group, searchText }) => (searchText.includes(term) ? [group] : []),
      );

      if (matchingGroups.length > 0) visible.set(module, matchingGroups);
    }

    return visible;
  }, [byModule, searchableByModule, deferredSearchTerm]);

  const visibleModules = useMemo(
    () => Array.from(visibleByModule),
    [visibleByModule],
  );

  const selectedCount = selected.size;
  const totalCount = permissions.length;

  const handleToggle = useCallback(
    (permission: Permission, group: PermissionGroup) => {
      if (disabled) return;

      const nextState = permissionSelectionReducer(
        { selected },
        { type: 'toggle', permission, group },
      );
      onChange(Array.from(nextState.selected));
    },
    [disabled, onChange, selected],
  );

  const handleToggleGroup = useCallback(
    (groupPermissions: readonly Permission[], checked: boolean) => {
      if (disabled) return;

      const nextState = permissionSelectionReducer(
        { selected },
        { type: 'setGroup', permissions: groupPermissions, checked },
      );
      onChange(Array.from(nextState.selected));
    },
    [disabled, onChange, selected],
  );

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex flex-col gap-3 pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="text-muted-foreground pointer-events-none absolute start-2.5 top-1/2 size-4 -translate-y-1/2" />
          <Input
            value={searchTerm}
            disabled={disabled}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setSearchTerm(event.target.value)
            }
            placeholder={tPicker('searchPlaceholder')}
            aria-label={tPicker('searchPlaceholder')}
            className="ps-8"
          />
        </div>

        <p className="text-muted-foreground shrink-0 text-sm">
          {tPicker('selectedCount', {
            selected: selectedCount,
            total: totalCount,
          })}
        </p>
      </div>

      <div
        className={cn(
          'min-h-0 flex-1 space-y-6 pe-1 transition-opacity duration-150',
          isStale ? 'opacity-60' : 'opacity-100',
        )}
      >
        {visibleModules.length === 0 ? (
          <p className="text-muted-foreground py-8 text-center text-sm">
            {tPicker('noResults')}
          </p>
        ) : null}

        {visibleModules.map(([module, groups], index) => (
          <PermissionModuleSection
            key={module}
            module={module}
            groups={groups}
            selected={selected}
            disabled={disabled}
            onToggle={handleToggle}
            onToggleGroup={handleToggleGroup}
            showSeparator={index < visibleModules.length - 1}
            t={t}
          />
        ))}
      </div>
    </div>
  );
}
