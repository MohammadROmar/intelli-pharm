import { startTransition, useCallback } from 'react';
import { useSearchParams } from 'react-router';

import type { ReadStatusFilter } from './types';

export const TAB_OPTIONS = [
  'all',
  'read',
  'unread',
] as const satisfies readonly ReadStatusFilter[];

const READ_STATUS_SET = new Set<string>(TAB_OPTIONS);

function isReadStatusFilter(value: string | null): value is ReadStatusFilter {
  return value !== null && READ_STATUS_SET.has(value);
}

export function useReadStatusFilter() {
  const [searchParams, setSearchParams] = useSearchParams();

  const readStatusParam = searchParams.get('read_status');
  const activeTab: ReadStatusFilter = isReadStatusFilter(readStatusParam)
    ? readStatusParam
    : 'all';

  const handleTabChange = useCallback(
    (value: string) => {
      startTransition(() => {
        setSearchParams((prev) => {
          const next = new URLSearchParams(prev);
          next.delete('page');

          if (value === 'all') {
            next.delete('read_status');
          } else {
            next.set('read_status', value);
          }

          return next;
        });
      });
    },
    [setSearchParams],
  );

  return { activeTab, handleTabChange } as const;
}
