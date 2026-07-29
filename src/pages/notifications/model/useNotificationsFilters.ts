import { useSearchParams } from 'react-router';

import { useFilters, parseFilters } from '@/shared/lib';

export type ReadStatusFilter = 'read' | 'unread';

type NotificationsFilters = { read_status?: ReadStatusFilter };

const READ_STATUS_VALUES = new Set(['read', 'unread']);

function isReadStatusFilter(value: unknown): value is ReadStatusFilter {
  return typeof value === 'string' && READ_STATUS_VALUES.has(value);
}

const FILTER_KEYS: (keyof NotificationsFilters)[] = ['read_status'];

export function useNotificationsFilters() {
  const [searchParams] = useSearchParams();

  const parsed = parseFilters<NotificationsFilters>(searchParams);
  const filters: NotificationsFilters = isReadStatusFilter(parsed.read_status)
    ? { read_status: parsed.read_status }
    : {};

  return useFilters<NotificationsFilters>({ filters, filterKeys: FILTER_KEYS });
}
