import { useCallback, useMemo, useTransition } from 'react';
import { useSearchParams } from 'react-router';

import { useFilters } from '@/shared/lib';

import type { DashboardRange } from './types';

const VALID_RANGES: readonly DashboardRange[] = ['today', '7d', '30d'];

function parseRange(raw: string | null): DashboardRange {
  return (VALID_RANGES as readonly string[]).includes(raw ?? '')
    ? (raw as DashboardRange)
    : 'today';
}

export function useDashboardFilters() {
  const [searchParams] = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const range = useMemo(
    () => parseRange(searchParams.get('range')),
    [searchParams],
  );

  const { applyFilters } = useFilters<{ range: DashboardRange }>({
    filters: { range },
    filterKeys: ['range'],
    replace: true,
  });

  const setRange = useCallback(
    (next: DashboardRange) => {
      startTransition(() => {
        applyFilters({ range: next });
      });
    },
    [applyFilters, startTransition],
  );

  return { range, setRange, isPending };
}
