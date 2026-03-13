import { lazy } from 'react';

import { WithSuspense } from '@/shared/ui/index.initial';

const NotFoundPage = lazy(() => import('./NotFoundPage'));

export function LazyNotFoundPage() {
  return <WithSuspense Component={NotFoundPage} />;
}
