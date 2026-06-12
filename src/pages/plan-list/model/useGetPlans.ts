import { usePlanFilters } from './usePlanFilters';
import type { PlanListApiResponse, PlanSummary } from '@/entities/plan';
import { useSuspenseGetEntities } from '@/shared/model';

export function useGetPlans() {
  const { filters } = usePlanFilters();

  return useSuspenseGetEntities<PlanListApiResponse, PlanSummary>({
    queryKey: 'plans',
    module: 'planner',
    filters,
  });
}
