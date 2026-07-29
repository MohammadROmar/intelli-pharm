import type { LoginResponse } from '@/features/auth/index.initial';

export function toSessionCredentials(data: LoginResponse) {
  return {
    accessToken: data.access_token,
    roles: data.roles,
    user: { name: data.name, email: data.email },
    unread_notifications_count: data.unread_notifications_count,
  };
}
