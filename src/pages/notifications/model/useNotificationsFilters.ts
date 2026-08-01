import { useSearchParams } from 'react-router';

import { useFilters, parseFilters } from '@/shared/lib';

import {
  hasInvalidNotificationDateRange,
  normalizeNotificationDate,
} from '../lib/notificationDateFilters';
import type {
  NotificationsFilters,
  ReadStatusFilter,
} from './notificationsTypes';

const READ_STATUS_VALUES = new Set(['read', 'unread']);

function isReadStatusFilter(
  value: unknown,
): value is Exclude<ReadStatusFilter, 'all'> {
  return typeof value === 'string' && READ_STATUS_VALUES.has(value);
}

const FILTER_KEYS: (keyof NotificationsFilters)[] = [
  'read_status',
  'from_date',
  'to_date',
];

export function useNotificationsFilters() {
  const [searchParams] = useSearchParams();

  const parsed = parseFilters<NotificationsFilters>(searchParams);
  const fromDate = normalizeNotificationDate(parsed.from_date);
  const toDate = normalizeNotificationDate(parsed.to_date);
  const hasInvalidDateRange = hasInvalidNotificationDateRange(fromDate, toDate);

  const filters: NotificationsFilters = {
    ...(isReadStatusFilter(parsed.read_status) && {
      read_status: parsed.read_status,
    }),
    ...(!hasInvalidDateRange && fromDate && { from_date: fromDate }),
    ...(!hasInvalidDateRange && toDate && { to_date: toDate }),
  };

  return useFilters<NotificationsFilters>({ filters, filterKeys: FILTER_KEYS });
}
