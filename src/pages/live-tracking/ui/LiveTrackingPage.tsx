import { lazy, Suspense } from 'react';
import { useTranslation } from 'react-i18next';

import { ErrorBoundary } from '@/shared/lib';
import { PageTitle, SectionErrorFallback, Skeleton } from '@/shared/ui';
import {
  TrackingFiltersBar,
  useTrackingFilters,
} from '@/features/live-tracking-filters';

const LiveTrackingMap = lazy(() =>
  import('./LiveTrackingMap').then((module) => ({
    default: module.LiveTrackingMap,
  })),
);

export default function LiveTrackingPage() {
  const { t } = useTranslation('tracking', { keyPrefix: 'page' });
  const { filter } = useTrackingFilters();

  return (
    <>
      <PageTitle title={t('title')} subtitle={t('subtitle')} />

      <TrackingFiltersBar />

      <ErrorBoundary
        FallbackComponent={SectionErrorFallback}
        resetKeys={[filter.regionId, filter.role]}
      >
        <Suspense fallback={<Skeleton className="h-140 w-full rounded-lg" />}>
          <LiveTrackingMap filter={filter} />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
