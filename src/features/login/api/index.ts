import type { LoginResponse, LoginParams } from '../model/loginTypes';
import { apiClient, unwrapApiResponse } from '@/shared/api';

export async function login(credentials: LoginParams) {
  const response = await apiClient.post<LoginResponse>(
    '/auth/v1/login',
    credentials,
  );

  return unwrapApiResponse(response);
}
