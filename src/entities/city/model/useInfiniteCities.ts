import { useInfiniteQuery } from '@tanstack/react-query';

import { getInfiniteCities } from '../api/api';
import { getNextPageParam } from '@/shared/lib';

export function useInfiniteCities(searchTerm: string) {
  const queryResult = useInfiniteQuery({
    queryKey: ['cities', searchTerm],
    initialPageParam: 1,
    getNextPageParam,
    queryFn: async ({ pageParam = 1 }) =>
      getInfiniteCities(pageParam.toString(), searchTerm),
  });

  const flatCities =
    queryResult.data?.pages.flatMap((page) => page.items) ?? [];

  return {
    cities: flatCities,
    queryResult,
  };
}
