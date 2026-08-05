import type { TFunction } from 'i18next';

import type { ParsedAction } from './permissionParser';

const FALLBACK_ACTION_STYLE = 'bg-muted text-muted-foreground';

const ACTION_STYLES: Readonly<Record<string, string>> = {
  view: 'bg-blue-500/10 text-blue-500',
  create: 'bg-green-500/10 text-green-500',
  complete: 'bg-lime-500/10 text-lime-500',
  update: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400',
  delete: 'bg-red-500/10 text-red-500',
  cancel: 'bg-red-500/10 text-red-500',
  manage: 'bg-purple-500/10 text-purple-500',
  generate: 'bg-indigo-500/10 text-indigo-500',
  check: 'bg-teal-500/10 text-teal-500',
  deactivate: 'bg-orange-500/10 text-orange-500',
  assign_distributor: 'bg-slate-500/10 text-slate-400',
  view_live: 'bg-blue-500/10 text-blue-500',
  view_all: 'bg-blue-500/10 text-blue-500',
  get: 'bg-cyan-500/10 text-cyan-500',
  submit_location: 'bg-sky-500/10 text-sky-500',
  access: 'bg-fuchsia-500/10 text-fuchsia-500',
  overview: 'bg-blue-500/10 text-blue-500',
};

const MODULE_LABELS: Readonly<Record<string, string>> = {
  erp: 'ERP',
  crm: 'CRM',
  planner: 'Planner',
  auth: 'Auth',
  tracking: 'Tracking',
  dashboard: 'Dashboard',
};

type PermissionTranslator = TFunction<'permissions'>;

export function getModuleLabel(
  module: string,
  t: PermissionTranslator,
): string {
  return t(`modules.${module}`, {
    defaultValue: MODULE_LABELS[module] ?? module,
  });
}

export function getResourceLabel(
  resourceParts: readonly string[],
  moduleLabel: string,
  t: PermissionTranslator,
): string {
  if (resourceParts.length === 0) return moduleLabel;

  return resourceParts
    .map((part) => t(`resources.${part}`, { defaultValue: part }))
    .join(' › ');
}

export function getActionPresentation(
  { action, scope }: Pick<ParsedAction, 'action' | 'scope'>,
  t: PermissionTranslator,
) {
  return {
    style: ACTION_STYLES[action] ?? FALLBACK_ACTION_STYLE,
    label: t(`actions.${action}`, {
      defaultValue: action.replace(/_/g, ' '),
    }),
    scopeLabel: scope ? t(`scope.${scope}`, { defaultValue: scope }) : null,
  };
}
