import { lazy } from 'react';

import { NotificationsPageSkeleton } from './NotificationsPageSkeleton';
import { WithSuspense } from '@/shared/ui/index.initial';

const NotificationsPage = lazy(() => import('./NotificationsPage'));

export function LazyNotificationsPage() {
  return (
    <WithSuspense loader={<NotificationsPageSkeleton />}>
      <NotificationsPage />
    </WithSuspense>
  );
}
