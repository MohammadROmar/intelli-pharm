import { lazy, Suspense } from 'react';
import { useTranslation } from 'react-i18next';

import { PharmacyMetricsCards } from './PharmacyMetricsCards';
import { DetailedBreakdownTable } from './DetailedBreakdownTable';
import { PharmacyMetricsSelector } from './PharmacyMetricsSelector';
import { useGetPharmacyMetrics } from '../model/useGetPharmacyMetrics';
import { MetricsEmptyState } from '@/entities/metrics';
import { ErrorBoundary } from '@/shared/lib';
import {
  Skeleton,
  PageTitle,
  QueryError,
  MetricsSkeleton,
  SectionErrorFallback,
} from '@/shared/ui';

const ScoreChart = lazy(() => import('./ScoreChart'));

export default function MetricsPharmacyPage() {
  const { t } = useTranslation('translation', {
    keyPrefix: 'metricsPage.pharmacy',
  });

  const { data, isLoading, isError, error, refetch } = useGetPharmacyMetrics();

  if (isError) {
    return <QueryError error={error} onRetry={refetch} />;
  }

  if (isLoading || !data) {
    return <MetricsSkeleton />;
  }

  const metrics = data.data!;

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <PageTitle title={t('title')} subtitle={t('subtitle')} />
        <div className="w-fit">
          <PharmacyMetricsSelector placeholder={t('selectorPlaceholder')} />
        </div>
      </div>
      {metrics.length > 0 ? (
        <>
          <PharmacyMetricsCards metrics={metrics} />
          <ErrorBoundary FallbackComponent={SectionErrorFallback}>
            <Suspense fallback={<Skeleton className="h-94 w-full" />}>
              <ScoreChart metrics={metrics} />
            </Suspense>
          </ErrorBoundary>
          <DetailedBreakdownTable metrics={metrics} />
        </>
      ) : (
        <MetricsEmptyState />
      )}
    </>
  );
}
