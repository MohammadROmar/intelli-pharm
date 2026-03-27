import { useInfiniteQuery } from '@tanstack/react-query';

import { getInfiniteLaboratories } from '../api/api';
import { getNextPageParam } from '@/shared/lib';

export function useInfiniteLaboratories(searchTerm: string) {
  const queryResult = useInfiniteQuery({
    queryKey: ['laboratories', searchTerm],
    initialPageParam: 1,
    getNextPageParam,
    queryFn: async ({ pageParam = 1 }) =>
      getInfiniteLaboratories(pageParam.toString(), searchTerm),
  });

  const flatLaboratories =
    queryResult.data?.pages.flatMap((page) => page.items) ?? [];

  return {
    laboratories: flatLaboratories,
    queryResult,
  };
}
