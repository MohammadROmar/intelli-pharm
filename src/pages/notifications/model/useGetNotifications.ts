import type {
  Notification,
  NotificationsParams,
  NotificationsResponse,
} from './types';
import { useSuspenseGetEntities } from '@/shared/model';

export function useGetNotifications(params: NotificationsParams) {
  return useSuspenseGetEntities<NotificationsResponse, Notification>({
    queryKey: 'notifications',
    module: 'auth',
    filters: params,
  });
}
