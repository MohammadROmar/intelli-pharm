import type { PlanListApiResponse, PlanSummary } from '@/entities/plan';
import { useSuspenseGetEntities } from '@/shared/model';

import { usePlanFilters } from './usePlanFilters';

const PLAN_FRESHNESS_WINDOW_MS = 1_000;

export function useGetPlans() {
  const { filters } = usePlanFilters();

  return useSuspenseGetEntities<PlanListApiResponse, PlanSummary>({
    queryKey: 'plans',
    module: 'planner',
    filters,
    staleTime: PLAN_FRESHNESS_WINDOW_MS,
    refetchOnMount: true,
  });
}
