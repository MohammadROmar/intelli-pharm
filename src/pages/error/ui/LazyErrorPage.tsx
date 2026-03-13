import { lazy } from 'react';

import { WithSuspense } from '@/shared/ui/index.initial';

const ErrorPage = lazy(() => import('./ErrorPage'));

export function LazyErrorPage() {
  return <WithSuspense Component={ErrorPage} />;
}
