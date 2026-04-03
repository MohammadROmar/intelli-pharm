import { useRegionFilters } from './useRegionFilters';
import type { RegionListItem, RegionsListResponse } from '@/entities/region';
import { useGetEntities } from '@/shared/model';

export function useGetRegions() {
  const { filters } = useRegionFilters();

  return useGetEntities<RegionsListResponse, RegionListItem>({
    queryKey: 'regions',
    filters,
  });
}
