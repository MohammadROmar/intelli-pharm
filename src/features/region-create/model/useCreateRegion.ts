import { createRegion, type Region } from '@/entities/region';
import { useCreateEntity } from '@/shared/model';

export function useCreateRegion() {
  return useCreateEntity<Region>({
    queryKey: 'regions',
    mutationFn: createRegion,
    translationKey: 'region',
  });
}
