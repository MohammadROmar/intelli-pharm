import { useSuspenseGetEntities } from '@/shared/model';

import { useNotificationsFilters } from './useNotificationsFilters';
import type { Notification, NotificationsResponse } from './notificationsTypes';

export function useGetNotifications() {
  const { filters } = useNotificationsFilters();

  return useSuspenseGetEntities<NotificationsResponse, Notification>({
    queryKey: 'notifications',
    module: 'auth',
    filters: filters,
  });
}
