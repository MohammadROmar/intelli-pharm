import { lazy } from 'react';

import { AetherSpinner, WithSuspense } from '@/shared/ui/index.initial';

const ErrorPage = lazy(() => import('./ErrorPage'));

const LOADER = (
  <div className="flex h-dvh items-center justify-center">
    <AetherSpinner />
  </div>
);

export function LazyErrorPage() {
  return (
    <WithSuspense loader={LOADER}>
      <ErrorPage />
    </WithSuspense>
  );
}
