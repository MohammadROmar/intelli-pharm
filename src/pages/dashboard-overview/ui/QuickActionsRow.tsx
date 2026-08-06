import { memo, useMemo } from 'react';
import { Cross, Pill, Route as RouteIcon, UserPlus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

import { hasPermission, useGrantedPermissions } from '@/entities/session';

const ACTIONS = [
  {
    to: '/dashboard/pharmacies/new',
    icon: Cross,
    key: 'newPharmacy',
    permission: 'erp.pharmacies.create',
  },
  {
    to: '/dashboard/employees/new',
    icon: UserPlus,
    key: 'newEmployee',
    permission: 'erp.employees.create',
  },
  {
    to: '/dashboard/plans/initiate',
    icon: RouteIcon,
    key: 'initiatePlan',
    permission: 'planner.rep.plan.generate',
  },
  {
    to: '/dashboard/medicines/new',
    icon: Pill,
    key: 'newMedicine',
    permission: 'erp.medicines.create',
  },
] as const;

export const QuickActionsRow = memo(function QuickActionsRow() {
  const { t } = useTranslation('dashboard-overview', {
    keyPrefix: 'quickActions',
  });
  const grantedPermissions = useGrantedPermissions();

  const visibleActions = useMemo(
    () =>
      ACTIONS.filter((action) =>
        hasPermission(grantedPermissions, action.permission),
      ),
    [grantedPermissions],
  );

  if (visibleActions.length === 0) {
    return null;
  }

  return (
    <div className="mt-8 space-y-2">
      <div>
        <h2 className="w-fit text-lg font-semibold md:text-xl">{t('title')}</h2>
        <p className="text-muted-foreground w-fit text-sm">{t('subtitle')}</p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {visibleActions.map(({ to, icon: Icon, key }) => (
          <Link
            key={key}
            to={to}
            className="group border-border bg-card focus-visible:ring-ring relative flex flex-col items-center gap-2.5 rounded-xl border px-3 py-5 text-center shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none active:translate-y-0 active:scale-[0.98] motion-reduce:hover:translate-y-0"
          >
            <span className="bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground flex size-11 items-center justify-center rounded-full transition-colors duration-200">
              <Icon className="size-5" aria-hidden />
            </span>
            <span className="text-foreground text-sm font-medium">
              {t(key)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
});
