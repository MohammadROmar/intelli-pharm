import type { Target } from '@/entities/target';
import { useGetEntityById } from '@/shared/model';

export function useGetTarget() {
  return useGetEntityById<Target>({
    queryKey: 'targets',
    endpoint: '/erp/v1/targets',
  });
}
