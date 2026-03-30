import { getInfiniteCities } from '../api';
import { useInfiniteEntities } from '@/shared/model';
import type { CityDetail } from './cityTypes';

export function useInfiniteCities(searchTerm: string) {
  return useInfiniteEntities<CityDetail>({
    queryKey: 'cities',
    searchTerm,
    queryFn: getInfiniteCities,
  });
}
