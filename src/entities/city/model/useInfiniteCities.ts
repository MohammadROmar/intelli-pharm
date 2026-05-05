import { getInfiniteCities } from '../api';
import { useInfiniteEntities } from '@/shared/model';

export function useInfiniteCities(searchTerm: string) {
  return useInfiniteEntities<{ id: number; name: string }>({
    queryKey: 'cities',
    searchTerm,
    queryFn: getInfiniteCities,
  });
}
