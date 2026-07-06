import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircle2, KeyRound, PackageSearch } from 'lucide-react';
import type { TFunction } from 'i18next';

import { DetailCard, Separator } from '@/shared/ui';

type ParsedAction = { action: string; scope?: string };

type PermissionGroup = {
  module: string;
  resourceParts: string[];
  actions: ParsedAction[];
};

const SCOPE_SUFFIXES = new Set(['own']);

const ACTION_STYLES: Record<string, string> = {
  view: 'bg-blue-500/10   text-blue-500',
  create: 'bg-green-500/10  text-green-500',
  complete: 'bg-lime-500/10  text-lime-500',
  update: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400',
  delete: 'bg-red-500/10    text-red-500',
  cancel: 'bg-red-500/10    text-red-500',
  manage: 'bg-purple-500/10 text-purple-500',
  generate: 'bg-indigo-500/10 text-indigo-500',
  check: 'bg-teal-500/10   text-teal-500',
  deactivate: 'bg-orange-500/10 text-orange-500',
  assign_distributor: 'bg-slate-500/10 text-slate-400',
  view_live: 'bg-blue-500/10 text-blue-500',
  view_all: 'bg-blue-500/10 text-blue-500',
  get: 'bg-cyan-500/10   text-cyan-500',
  submit_location: 'bg-sky-500/10    text-sky-500',
};

const MODULE_LABELS: Record<string, string> = {
  erp: 'ERP',
  crm: 'CRM',
  planner: 'Planner',
  auth: 'Auth',
  tracking: 'Tracking',
};

function parsePermission(permission: string) {
  const segments = permission.split('.');
  const module = segments[0];
  let rest = segments.slice(1);

  let scope: string | undefined;
  const lastSegment = rest[rest.length - 1];
  if (rest.length >= 2 && SCOPE_SUFFIXES.has(lastSegment)) {
    scope = lastSegment;
    rest = rest.slice(0, -1);
  }

  const action = rest[rest.length - 1] ?? '';
  const resourceParts = rest.slice(0, -1);

  return { module, resourceParts, action, scope };
}

function groupPermissionsByModule(
  permissions: string[],
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
    group.actions.push({ action, scope });
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

function getActionKey({ action, scope }: ParsedAction): string {
  return scope ? `${action}-${scope}` : action;
}

type ActionBadgeProps = ParsedAction & { t: TFunction<'employees', 'detail'> };

const ActionBadge = memo(function ActionBadge({
  action,
  scope,
  t,
}: ActionBadgeProps) {
  const style = ACTION_STYLES[action] ?? 'bg-muted text-muted-foreground';
  const label = t(`actions.${action}`, {
    defaultValue: action.replace(/_/g, ' '),
  });
  const scopeLabel = scope
    ? t(`scope.${scope}`, { defaultValue: scope })
    : null;

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

type PermissionGroupRowProps = {
  group: PermissionGroup;
  moduleLabel: string;
  t: TFunction<'employees', 'detail'>;
};

const PermissionGroupRow = memo(function PermissionGroupRow({
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

type ModuleSectionProps = {
  module: string;
  groups: PermissionGroup[];
  showSeparator: boolean;
  t: TFunction<'employees', 'detail'>;
};

const ModuleSection = memo(function ModuleSection({
  module,
  groups,
  showSeparator,
  t,
}: ModuleSectionProps) {
  const moduleLabel = t(`modules.${module}`, {
    defaultValue: MODULE_LABELS[module] ?? module,
  });

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

type Props = { permissions: string[] };

export function EmployeePermissionsCard({ permissions }: Props) {
  const { t } = useTranslation('employees', { keyPrefix: 'detail' });

  const byModule = useMemo(
    () => groupPermissionsByModule(permissions),
    [permissions],
  );
  const modules = useMemo(() => Array.from(byModule.keys()), [byModule]);

  if (!permissions.length) {
    return (
      <DetailCard
        title={t('permissionsCardTitle')}
        subtitle={t('permissionsCardSubtitle')}
        icon={KeyRound}
      >
        <div className="text-muted-foreground flex flex-col items-center gap-2 py-8 text-center">
          <PackageSearch className="size-8" />
          <p className="text-sm">{t('noPermissions')}</p>
        </div>
      </DetailCard>
    );
  }

  return (
    <DetailCard
      title={t('permissionsCardTitle')}
      subtitle={t('permissionsCardSubtitle')}
      icon={KeyRound}
      itemsCount={permissions.length}
    >
      <div className="space-y-6">
        {modules.map((module, index) => (
          <ModuleSection
            key={module}
            module={module}
            groups={byModule.get(module)!}
            showSeparator={index < modules.length - 1}
            t={t}
          />
        ))}
      </div>
    </DetailCard>
  );
}
