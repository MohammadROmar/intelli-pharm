import { lazy } from 'react';

import { WithSuspense } from '@/shared/ui/index.initial';

import { LiveTrackingSkeleton } from './LiveTrackingSkeleton';

const LiveTrackingPage = lazy(() => import('./LiveTrackingPage'));

export function LazyLiveTrackingPage() {
  return (
    <WithSuspense loader={<LiveTrackingSkeleton />}>
      <LiveTrackingPage />
    </WithSuspense>
  );
}
