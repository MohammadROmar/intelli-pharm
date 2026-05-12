import { useTargetFilters } from './useTargetFilters';
import type { Target, TargetResponse } from '@/entities/target';
import { useGetEntities } from '@/shared/model';

export function useGetTargets() {
  const { filters } = useTargetFilters();

  return useGetEntities<TargetResponse, Target>({
    queryKey: 'targets',
    filters,
  });
}
