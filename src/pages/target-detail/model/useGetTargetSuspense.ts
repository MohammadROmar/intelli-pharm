import type { Target } from '@/entities/target';
import { useSuspenseGetEntityById } from '@/shared/model';

export function useGetTargetSuspense(id: number) {
  return useSuspenseGetEntityById<Target>({
    id,
    queryKey: 'targets',
    endpoint: '/erp/v1/targets',
  });
}
