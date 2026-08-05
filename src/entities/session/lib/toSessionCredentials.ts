import type { Permission } from '@/shared/api';

import type { SessionCredentials } from '../model/slice';

type SessionCredentialsSource = {
  access_token: string;
  roles: readonly string[];
  permissions: readonly Permission[];
  name: string;
  email: string;
  unread_notifications_count: number;
};

export function toSessionCredentials(data: SessionCredentialsSource): SessionCredentials {
  return {
    accessToken: data.access_token,
    roles: [...data.roles],
    permissions: [...data.permissions],
    user: { name: data.name, email: data.email },
    unread_notifications_count: data.unread_notifications_count,
  };
}
