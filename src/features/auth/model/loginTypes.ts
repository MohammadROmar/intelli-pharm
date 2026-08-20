import type { Permission } from '@/shared/api';

export type LoginResponse = {
  name: string;
  email: string;
  access_token: string;
  token_type: string;
  expires_in: number;
  roles: string[];
  phone_number: string | null;
  permissions: Permission[];
  unread_notifications_count: number;
};

export type LoginParams = {
  email: string;
  password: string;
};
