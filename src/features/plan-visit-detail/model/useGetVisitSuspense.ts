import type { VisitDetail } from '../model/visitTypes';
import { useSuspenseGetEntityById } from '@/shared/model';

export function useGetVisitSuspense(id: number) {
  return useSuspenseGetEntityById<VisitDetail>({
    id,
    queryKey: 'visits',
    endpoint: '/planner/v1/visits',
  });
}
