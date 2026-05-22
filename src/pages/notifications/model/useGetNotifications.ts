import type { NotificationsParams } from '@/features/notifications';
import { useSuspenseGetEntities } from '@/shared/model';

import type { Notification, NotificationsResponse } from './types';

export function useGetNotifications(params: NotificationsParams) {
  return useSuspenseGetEntities<NotificationsResponse, Notification>({
    queryKey: 'notifications',
    module: 'auth',
    filters: params,
  });
}
