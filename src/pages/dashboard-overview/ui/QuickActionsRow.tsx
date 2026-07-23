import { memo } from 'react';
import { Cross, Pill, Route as RouteIcon, UserPlus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const ACTIONS = [
  { to: '/dashboard/pharmacies/new', icon: Cross, key: 'newPharmacy' },
  { to: '/dashboard/employees/new', icon: UserPlus, key: 'newEmployee' },
  { to: '/dashboard/plans/initiate', icon: RouteIcon, key: 'initiatePlan' },
  { to: '/dashboard/medicines/new', icon: Pill, key: 'newMedicine' },
] as const;

export const QuickActionsRow = memo(function QuickActionsRow() {
  const { t } = useTranslation('dashboard-overview', {
    keyPrefix: 'quickActions',
  });

  return (
    <div className="mt-8 space-y-2">
      <div>
        <h2 className="text-lg font-semibold md:text-xl">{t('title')}</h2>
        <p className="text-muted-foreground text-sm">{t('subtitle')}</p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {ACTIONS.map(({ to, icon: Icon, key }, index) => (
          <Link
            key={key}
            to={to}
            className="group border-border bg-card motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-1 focus-visible:ring-ring hover:border-primary/30 relative flex flex-col items-center gap-2.5 rounded-xl border px-3 py-5 text-center shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none active:translate-y-0 active:scale-[0.98] motion-reduce:animate-none motion-reduce:hover:translate-y-0"
            style={{
              animationDelay: `${index * 60}ms`,
              animationDuration: '300ms',
            }}
          >
            <span className="bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground flex size-11 items-center justify-center rounded-full transition-colors duration-200">
              <Icon className="size-5" aria-hidden="true" />
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
