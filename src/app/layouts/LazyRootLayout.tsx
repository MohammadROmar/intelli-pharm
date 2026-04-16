import { lazy } from 'react';

import { Logo, WithSuspense } from '@/shared/ui/index.initial';

const RootLayout = lazy(() => import('./RootLayout'));

export function LazyRootLayout() {
  return (
    <WithSuspense
      Component={RootLayout}
      loader={
        <div className="flex h-screen items-center justify-center">
          <Logo withColors className="size-12" />
        </div>
      }
    />
  );
}
