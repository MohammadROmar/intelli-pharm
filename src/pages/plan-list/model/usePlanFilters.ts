import { useSearchParams } from 'react-router';

import type { PlanFilters } from '@/entities/plan';
import { parseFilters, useFilters } from '@/shared/lib';

type PlanListFilters = PlanFilters;

const FILTER_KEYS: (keyof PlanListFilters)[] = ['user_id', 'date', 'finished'];

export function usePlanFilters() {
  const [searchParams] = useSearchParams();

  const filters = parseFilters<PlanListFilters>(searchParams, {
    finished: 'boolean',
  });

  const filterState = useFilters<PlanListFilters>({
    filters,
    filterKeys: FILTER_KEYS,
  });

  return filterState;
}
