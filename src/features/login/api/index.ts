import type { LoginResponse, LoginParams } from '../model/loginTypes';
import { apiClient, unwrapApiResponse } from '@/shared/api';

export async function login(credentials: LoginParams) {
  let fcmToken: string | null = null;

  try {
    const { requestPermissionAndGetToken } =
      await import('@/shared/notifications');
    fcmToken = await requestPermissionAndGetToken();
  } catch (error) {
    console.warn('Failed to retrieve FCM token during login:', error);
  }

  const response = await apiClient.post<LoginResponse>('/auth/v1/login', {
    ...credentials,
    FCMToken: fcmToken,
  });

  return unwrapApiResponse(response);
}
