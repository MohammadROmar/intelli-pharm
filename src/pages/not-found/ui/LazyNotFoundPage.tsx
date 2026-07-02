import { lazy } from 'react';
import { AetherSpinner, WithSuspense } from '@/shared/ui/index.initial';

const NotFoundPage = lazy(() => import('./NotFoundPage'));

type LazyNotFoundPageProps = { minimal?: boolean };

const LOADER = (
  <div className="flex h-dvh items-center justify-center">
    <AetherSpinner />
  </div>
);

export function LazyNotFoundPage({ minimal }: LazyNotFoundPageProps) {
  return (
    <WithSuspense loader={LOADER}>
      <NotFoundPage minimal={minimal} />
    </WithSuspense>
  );
}
