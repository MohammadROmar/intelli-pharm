import type { Target, TargetResponse } from '@/entities/target';
import { useTargetFilters } from './useTargetFilters';
import { useSuspenseGetEntities } from '@/shared/model';

export function useGetTargetsSuspense() {
  const { filters } = useTargetFilters();

  return useSuspenseGetEntities<TargetResponse, Target>({
    queryKey: 'targets',
    filters,
  });
}
