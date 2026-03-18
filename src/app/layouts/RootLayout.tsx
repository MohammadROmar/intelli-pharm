import { lazy } from 'react';
import { Outlet, ScrollRestoration } from 'react-router-dom';

import { WithSuspense } from '@/shared/ui/index.initial';

const Toaster = lazy(() =>
  import('@/shared/ui/toaster').then((m) => ({ default: m.Toaster })),
);

export default function RootLayout() {
  return (
    <>
      <ScrollRestoration />
      <WithSuspense Component={Toaster} />

      <Outlet />
    </>
  );
}
