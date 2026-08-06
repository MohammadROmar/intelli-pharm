import { lazy, Suspense, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { ErrorBoundary } from '@/shared/lib';
import { hasPermission, useGrantedPermissions } from '@/entities/session';
import { PageTitle, SectionErrorFallback, Skeleton } from '@/shared/ui';
import {
  TrackingFiltersBar,
  useTrackingFilters,
} from '@/features/live-tracking-filters';
import {
  useTrackingFocus,
  TrackingRosterPanel,
} from '@/features/live-tracking-roster';

const LiveTrackingMap = lazy(() =>
  import('./LiveTrackingMap').then((module) => ({
    default: module.LiveTrackingMap,
  })),
);

export default function LiveTrackingPage() {
  const { t } = useTranslation('tracking', { keyPrefix: 'page' });
  const { filter } = useTrackingFilters();
  const { focusedUserId, setFocusedUserId } = useTrackingFocus();
  const grantedPermissions = useGrantedPermissions();

  const canViewEmployee = hasPermission(
    grantedPermissions,
    'erp.employees.view',
  );
  const canViewPlan = hasPermission(grantedPermissions, 'planner.plan.view');

  const handleSelectUser = useCallback(
    (userId: number) => {
      setFocusedUserId((current) => (current === userId ? null : userId));
    },
    [setFocusedUserId],
  );

  return (
    <>
      <PageTitle title={t('title')} subtitle={t('subtitle')} />

      <TrackingFiltersBar />

      <div className="relative flex h-140 gap-3">
        <TrackingRosterPanel
          filter={filter}
          focusedUserId={focusedUserId}
          onSelectUser={handleSelectUser}
          canViewEmployee={canViewEmployee}
          canViewPlan={canViewPlan}
        />

        <div className="min-w-0 flex-1">
          <ErrorBoundary
            FallbackComponent={SectionErrorFallback}
            resetKeys={[filter.regionId, filter.role]}
          >
            <Suspense
              fallback={<Skeleton className="h-140 w-full rounded-lg" />}
            >
              <LiveTrackingMap
                filter={filter}
                focusedUserId={focusedUserId}
                onSelectUser={handleSelectUser}
                canViewEmployee={canViewEmployee}
                canViewPlan={canViewPlan}
              />
            </Suspense>
          </ErrorBoundary>
        </div>
      </div>
    </>
  );
}
