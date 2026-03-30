import type { RegionListItem } from './regionTypes';
import { getInfiniteRegions } from '../api';
import { useInfiniteEntities } from '@/shared/model';

export function useInfiniteRegions(searchTerm: string) {
  return useInfiniteEntities<RegionListItem>({
    queryKey: 'regions',
    searchTerm,
    queryFn: getInfiniteRegions,
  });
}
