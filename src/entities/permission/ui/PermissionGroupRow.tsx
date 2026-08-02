import { memo } from 'react';
import type { TFunction } from 'i18next';
import { CheckCircle2 } from 'lucide-react';

import { ActionBadge } from './ActionBadge';
import { getActionKey, type PermissionGroup } from '../lib/permissionParser';

type PermissionGroupRowProps = {
  group: PermissionGroup;
  moduleLabel: string;
  t: TFunction<'permissions'>;
};

export const PermissionGroupRow = memo(function PermissionGroupRow({
  group,
  moduleLabel,
  t,
}: PermissionGroupRowProps) {
  const resourceLabel =
    group.resourceParts.length > 0
      ? group.resourceParts
          .map((part) => t(`resources.${part}`, { defaultValue: part }))
          .join(' › ')
      : moduleLabel;

  return (
    <div className="flex flex-col flex-wrap justify-between gap-3 sm:flex-row sm:items-center">
      <div className="flex items-center gap-2 text-sm">
        <CheckCircle2 className="text-muted-foreground size-3.5 shrink-0" />
        <span className="text-foreground font-medium capitalize">
          {resourceLabel}
        </span>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {group.actions.map((parsedAction) => (
          <ActionBadge
            key={getActionKey(parsedAction)}
            {...parsedAction}
            t={t}
          />
        ))}
      </div>
    </div>
  );
});
