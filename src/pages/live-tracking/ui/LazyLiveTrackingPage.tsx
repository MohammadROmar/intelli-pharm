import { lazy } from 'react';

import { AetherSpinner, WithSuspense } from '@/shared/ui/index.initial';

const LiveTrackingPage = lazy(() => import('./LiveTrackingPage'));

export function LazyLiveTrackingPage() {
  return (
    <WithSuspense
      loader={
        <div className="flex h-full items-center justify-center">
          <AetherSpinner />
        </div>
      }
    >
      <LiveTrackingPage />
    </WithSuspense>
  );
}
