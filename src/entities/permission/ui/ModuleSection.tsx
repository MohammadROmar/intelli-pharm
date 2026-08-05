import { memo } from 'react';
import type { TFunction } from 'i18next';

import { Separator } from '@/shared/ui';

import { PermissionGroupRow } from './PermissionGroupRow';
import { getModuleLabel } from '../lib/permissionPresentation';
import type { PermissionGroup } from '../lib/permissionParser';

type ModuleSectionProps = {
  module: string;
  groups: PermissionGroup[];
  showSeparator: boolean;
  t: TFunction<'permissions'>;
};

export const ModuleSection = memo(function ModuleSection({
  module,
  groups,
  showSeparator,
  t,
}: ModuleSectionProps) {
  const moduleLabel = getModuleLabel(module, t);

  return (
    <div>
      <p className="text-muted-foreground mb-3 text-[11px] font-semibold tracking-widest uppercase">
        {moduleLabel}
      </p>

      <div className="space-y-5 sm:space-y-3">
        {groups.map((group) => (
          <PermissionGroupRow
            key={group.resourceParts.join('.') || '__root__'}
            group={group}
            moduleLabel={moduleLabel}
            t={t}
          />
        ))}
      </div>

      {showSeparator && <Separator className="mt-6" />}
    </div>
  );
});
