import { useTranslation } from 'react-i18next';
import { CheckCircle2, KeyRound, PackageSearch } from 'lucide-react';

import { DetailCard, Separator } from '@/shared/ui';

type PermissionGroup = {
  module: string;
  resource: string;
  actions: string[];
};

function groupPermissions(permissions: string[]): PermissionGroup[] {
  const map = new Map<string, string[]>();

  for (const perm of permissions) {
    const parts = perm.split('.');
    const module = parts[0];
    const action = parts[parts.length - 1];
    const resource = parts.slice(1, -1).join('.');

    const key = `${module}.${resource}`;
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(action);
  }

  return Array.from(map.entries()).map(([key, actions]) => {
    const [module, ...rest] = key.split('.');
    return { module, resource: rest.join('.'), actions };
  });
}

function byModule(
  groups: PermissionGroup[],
): Record<string, PermissionGroup[]> {
  return groups.reduce<Record<string, PermissionGroup[]>>((acc, g) => {
    if (!acc[g.module]) acc[g.module] = [];
    acc[g.module].push(g);
    return acc;
  }, {});
}

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
};

function ActionBadge({ action }: { action: string }) {
  const { t } = useTranslation('employees', {
    keyPrefix: 'detail',
  });
  const style = ACTION_STYLES[action] ?? 'bg-muted text-muted-foreground';
  const fallbackText = action.replace(/_/g, ' ');

  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-medium ${style}`}
    >
      {t(`actions.${action}`, { defaultValue: fallbackText })}
    </span>
  );
}

const MODULE_LABELS: Record<string, string> = {
  erp: 'ERP',
  crm: 'CRM',
  planner: 'Planner',
};

type Props = { permissions: string[] };

export function EmployeePermissionsCard({ permissions }: Props) {
  const { t } = useTranslation('employees', {
    keyPrefix: 'detail',
  });

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

  const grouped = groupPermissions(permissions);
  const byMod = byModule(grouped);
  const modules = Object.keys(byMod);

  return (
    <DetailCard
      title={t('permissionsCardTitle')}
      subtitle={t('permissionsCardSubtitle')}
      icon={KeyRound}
      itemsCount={permissions.length}
    >
      <div className="space-y-6">
        {modules.map((module, mi) => (
          <div key={module}>
            <p className="text-muted-foreground mb-3 text-[11px] font-semibold tracking-widest uppercase">
              {t(`modules.${module}`, {
                defaultValue: MODULE_LABELS[module] ?? module,
              })}
            </p>

            <div className="space-y-5 sm:space-y-3">
              {byMod[module].map((group) => (
                <div
                  key={group.resource}
                  className="flex flex-col flex-wrap justify-between gap-3 sm:flex-row sm:items-center"
                >
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="text-muted-foreground size-3.5 shrink-0" />
                    <span className="text-foreground font-medium capitalize">
                      {group.resource
                        .split('.')
                        .map((part) =>
                          t(`resources.${part}`, { defaultValue: part }),
                        )
                        .join(' › ')}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {group.actions.map((action) => (
                      <ActionBadge key={action} action={action} />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {mi < modules.length - 1 && <Separator className="mt-6" />}
          </div>
        ))}
      </div>
    </DetailCard>
  );
}
