import type { PlanDetail } from '@/entities/plan';
import { useSuspenseGetEntityById } from '@/shared/model';

export function useGetPlan(id: number) {
  return useSuspenseGetEntityById<PlanDetail>({
    id,
    queryKey: 'plans',
    endpoint: '/planner/v1/plans',
  });
}
