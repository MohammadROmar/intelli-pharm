import type { PlanDetail } from '@/entities/plan';
import { useSuspenseGetEntityById } from '@/shared/model';

const PLAN_FRESHNESS_WINDOW_MS = 1_000;

export function useGetPlan(id: number) {
  return useSuspenseGetEntityById<PlanDetail>({
    id,
    queryKey: 'plans',
    endpoint: '/planner/v1/plans',
    staleTime: PLAN_FRESHNESS_WINDOW_MS,
    refetchOnMount: true,
  });
}
