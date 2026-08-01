import { useCallback } from 'react';

import type { ReadStatusFilter } from './notificationsTypes';
import { useNotificationsFilters } from './useNotificationsFilters';

export const TAB_OPTIONS = [
  'all',
  'unread',
  'read',
] as const satisfies readonly ReadStatusFilter[];

const READ_STATUS_SET = new Set<string>(TAB_OPTIONS);

function isReadStatusFilter(value: string | null): value is ReadStatusFilter {
  return value !== null && READ_STATUS_SET.has(value);
}

export function useReadStatusFilter() {
  const { filters, applyFilters } = useNotificationsFilters();
  const activeTab: ReadStatusFilter = filters.read_status ?? 'all';

  const handleTabChange = useCallback(
    (value: string) => {
      if (!isReadStatusFilter(value)) return;

      const nextFilters = { ...filters };

      if (value === 'all') {
        delete nextFilters.read_status;
      } else {
        nextFilters.read_status = value;
      }

      applyFilters(nextFilters);
    },
    [applyFilters, filters],
  );

  return { activeTab, handleTabChange } as const;
}
