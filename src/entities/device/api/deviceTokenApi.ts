import { apiClient } from '@/shared/api';

const DEVICE_TOKEN_ENDPOINT = '/auth/v1/notifications/device-token';

export async function updateFcmToken(newToken: string): Promise<void> {
  await apiClient.post(DEVICE_TOKEN_ENDPOINT, {
    fcm_token: newToken,
  });
}
