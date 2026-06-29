import { lazy } from 'react';
import { WithSuspense } from '@/shared/ui/index.initial';

const NotFoundPage = lazy(() => import('./NotFoundPage'));

interface LazyNotFoundPageProps {
  minimal?: boolean;
}

export function LazyNotFoundPage({ minimal }: LazyNotFoundPageProps) {
  return (
    <WithSuspense>
      <NotFoundPage minimal={minimal} />
    </WithSuspense>
  );
}
