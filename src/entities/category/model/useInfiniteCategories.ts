import { useInfiniteQuery } from '@tanstack/react-query';

import { getInfiniteCategories } from '../api';
import { getNextPageParam } from '@/shared/lib';

export function useInfiniteCategories(searchTerm: string) {
  const queryResult = useInfiniteQuery({
    queryKey: ['categories', searchTerm],
    initialPageParam: 1,
    getNextPageParam,
    queryFn: async ({ pageParam = 1 }) =>
      getInfiniteCategories(pageParam.toString(), searchTerm),
  });

  const flatCategories =
    queryResult.data?.pages.flatMap((page) => page.items) ?? [];

  return {
    categories: flatCategories,
    queryResult,
  };
}
