import { memo } from 'react';
import type { TFunction } from 'i18next';

import type { ParsedAction } from '../lib/permissionParser';
import { getActionPresentation } from '../lib/permissionPresentation';

type ActionBadgeProps = ParsedAction & { t: TFunction<'permissions'> };

export const ActionBadge = memo(function ActionBadge({
  action,
  scope,
  t,
}: ActionBadgeProps) {
  const { style, label, scopeLabel } = getActionPresentation(
    { action, scope },
    t,
  );

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-medium ${style}`}
    >
      {label}
      {scopeLabel && (
        <span className="border-s border-current/20 ps-1 text-[10px] font-normal opacity-70">
          {scopeLabel}
        </span>
      )}
    </span>
  );
});
