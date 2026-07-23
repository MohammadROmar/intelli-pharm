import { Outlet, ScrollRestoration } from 'react-router-dom';

import { Toaster } from '@/shared/ui';
import { getScrollRestorationKey } from '@/shared/lib';

import '@/shared/config/i18n';

export default function RootLayout() {
  return (
    <>
      <ScrollRestoration getKey={getScrollRestorationKey} />
      <Outlet />
      <Toaster />
    </>
  );
}
