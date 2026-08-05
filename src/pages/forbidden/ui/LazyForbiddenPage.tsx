import { lazy } from 'react';

import { AetherSpinner, WithSuspense } from '@/shared/ui/index.initial';

const ForbiddenPage = lazy(() => import('./ForbiddenPage'));

export function LazyForbiddenPage() {
  return (
    <WithSuspense
      loader={
        <div className="grid h-full items-center justify-center">
          <AetherSpinner />
        </div>
      }
    >
      <ForbiddenPage />
    </WithSuspense>
  );
}
