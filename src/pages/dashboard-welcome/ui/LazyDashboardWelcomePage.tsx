import { lazy } from 'react';

import { Skeleton, WithSuspense } from '@/shared/ui/index.initial';

const DashboardWelcomePage = lazy(() => import('./DashboardWelcomePage'));

const WELCOME_FALLBACK = (
  <div className="flex min-h-[calc(100dvh-8rem)] items-center justify-center rounded-2xl border p-6">
    <div className="w-full max-w-xl space-y-4">
      <Skeleton className="mx-auto h-7 w-36 lg:mx-0" />
      <Skeleton className="mx-auto h-11 w-full max-w-md lg:mx-0" />
      <Skeleton className="mx-auto h-5 w-full lg:mx-0" />
      <Skeleton className="mx-auto h-5 w-4/5 lg:mx-0" />
      <Skeleton className="mx-auto mt-6 h-9 w-40 lg:mx-0" />
    </div>
  </div>
);

export function LazyDashboardWelcomePage() {
  return (
    <WithSuspense loader={WELCOME_FALLBACK}>
      <DashboardWelcomePage />
    </WithSuspense>
  );
}
