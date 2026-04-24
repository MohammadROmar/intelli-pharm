import { Outlet, ScrollRestoration } from 'react-router-dom';

import { Toaster } from '@/shared/ui';
import '@/shared/config/i18n';

export default function RootLayout() {
  return (
    <>
      <ScrollRestoration />
      <Toaster />
      <Outlet />
    </>
  );
}
