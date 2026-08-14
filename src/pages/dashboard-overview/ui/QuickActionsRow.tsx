import { memo } from 'react';
import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';

import { useQuickActionsAccess } from '../model/useQuickActionsAccess';

export const QuickActionsRow = memo(function QuickActionsRow() {
  const { t } = useTranslation('dashboard-overview', {
    keyPrefix: 'quickActions',
  });

  const visibleActions = useQuickActionsAccess();

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
