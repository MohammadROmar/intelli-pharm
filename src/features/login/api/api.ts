import type { LoginResponse, LoginParams } from '../model/loginTypes';
import { apiClient } from '@/shared/api';

export async function login(credentials: LoginParams) {
  return apiClient.post<LoginResponse>('/auth/v1/login', credentials);
}
