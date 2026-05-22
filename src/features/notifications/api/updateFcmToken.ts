import { apiClient } from '@/shared/api';

export async function updateFcmToken(newToken: string) {
  return apiClient.post('/auth/v1/notifications/device-token', {
    fcm_token: newToken,
  });
}
