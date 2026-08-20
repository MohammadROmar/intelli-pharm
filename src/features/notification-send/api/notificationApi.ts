import { apiClient, type ApiResponse } from '@/shared/api';

import type { SendNotificationPayload } from '../model/notificationTypes';

export function sendNotification(payload: SendNotificationPayload) {
  return apiClient.post<ApiResponse<null>>(
    '/auth/v1/notifications/send',
    payload,
  );
}
