import { lazy, Suspense, useState, useTransition } from 'react';
import { useTranslation } from 'react-i18next';

import { cn, ErrorBoundary } from '@/shared/lib';
import { PageTitle, Skeleton, SectionErrorFallback } from '@/shared/ui';

import { useDashboardSummary } from '../model/queries';
import { useDashboardFilters } from '../model/useDashboardFilters';

import { KpiRow } from './KpiRow';
import { PreviewRow } from './PreviewRow';
import { QuickActionsRow } from './QuickActionsRow';
import { DashboardFilters } from './DashboardFilters';
import { NeedsAttentionPanel } from './NeedsAttentionPanel';

const TargetLeaderboardSection = lazy(() =>
  import('./TargetLeaderboardSection').then((module) => ({
    default: module.TargetLeaderboardSection,
  })),
);
const OrdersTrendSection = lazy(() =>
  import('./OrdersTrendSection').then((module) => ({
    default: module.OrdersTrendSection,
  })),
);

const CHART_FALLBACK = (
  <Skeleton className="h-77.5 w-full rounded-xl lg:h-full" />
);
const SECTION_FALLBACK = <Skeleton className="h-41.75 rounded-xl" />;

export function OverviewPage() {
  const { t } = useTranslation('dashboard-overview');
  const { range, setRange, isPending: isRangePending } = useDashboardFilters();

  const [areaId, setAreaIdState] = useState<number | null>(null);
  const [isAreaPending, startAreaTransition] = useTransition();
  const setAreaId = (next: number | null) => {
    startAreaTransition(() => setAreaIdState(next));
  };

  const { data: summaryResponse } = useDashboardSummary(range, areaId);
  const summary = summaryResponse.data!;

  const isRefreshing = isRangePending || isAreaPending;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <PageTitle title={t('title')} />

        <DashboardFilters
          range={range}
          onRangeChange={setRange}
          areaId={areaId}
          onAreaIdChange={setAreaId}
        />
      </div>

      <div
        className={cn(
          'space-y-4 transition-opacity',
          isRefreshing && 'pointer-events-none opacity-60',
        )}
        aria-busy={isRefreshing}
      >
        <KpiRow kpis={summary.kpis} />

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-[1.4fr_1fr]">
          <ErrorBoundary FallbackComponent={SectionErrorFallback}>
            <Suspense fallback={CHART_FALLBACK}>
              <OrdersTrendSection />
            </Suspense>
          </ErrorBoundary>

          <NeedsAttentionPanel items={summary.needs_attention} />
        </div>

        <PreviewRow
          liveTracking={summary.live_tracking_preview}
          todayPlans={summary.today_plans}
        />
      </div>

      <ErrorBoundary FallbackComponent={SectionErrorFallback}>
        <Suspense fallback={SECTION_FALLBACK}>
          <TargetLeaderboardSection />
        </Suspense>
      </ErrorBoundary>

      <QuickActionsRow />
    </div>
  );
}
