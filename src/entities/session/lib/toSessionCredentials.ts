import type { Permission } from '@/shared/api';

import type { SessionCredentials } from '../model/slice';

type SessionCredentialsSource = {
  access_token: string;
  roles: readonly string[];
  permissions: readonly Permission[];
  name: string;
  email: string;
  phone_number: string | null;
  unread_notifications_count: number;
};

export function toSessionCredentials(
  data: SessionCredentialsSource,
): SessionCredentials {
  return {
    accessToken: data.access_token,
    roles: [...data.roles],
    permissions: [...data.permissions],
    user: {
      name: data.name,
      email: data.email,
      phone_number: data.phone_number,
    },
    unread_notifications_count: data.unread_notifications_count,
  };
}
