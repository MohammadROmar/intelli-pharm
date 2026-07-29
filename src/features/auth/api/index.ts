import { apiClient, unwrapApiResponse } from '@/shared/api';

import type { LoginParams, LoginResponse } from '../model/loginTypes';

export async function login(credentials: LoginParams) {
  const response = await apiClient.post<LoginResponse>(
    '/auth/v2/login',
    credentials,
    { skipAuthRefresh: true },
  );

  return unwrapApiResponse(response);
}
