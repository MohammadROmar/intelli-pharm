import type { NotificationsParams } from './types';

export const notificationsKeys = {
  all: ['notifications'] as const,
  lists: () => [...notificationsKeys.all, 'list'] as const,
  list: (params: NotificationsParams) =>
    [...notificationsKeys.lists(), params] as const,
} as const;
