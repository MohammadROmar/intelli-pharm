import type { RegionListItem, RegionsListResponse } from '@/entities/region';
import { useSuspenseGetEntities } from '@/shared/model';

export function useGetRegionsSuspense() {
  return useSuspenseGetEntities<RegionsListResponse, RegionListItem>({
    queryKey: 'regions',
  });
}
