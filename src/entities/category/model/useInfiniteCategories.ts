import { useInfiniteQuery } from '@tanstack/react-query';
import { getInfinityCategories } from '../api/api';

export function useInfiniteCategories(searchTerm: string) {
  const queryResult = useInfiniteQuery({
    queryKey: ['categories', searchTerm],
    initialPageParam: 1,

    queryFn: async ({ pageParam = 1 }) =>
      getInfinityCategories(pageParam.toString(), searchTerm),

    getNextPageParam: (lastPageData) => {
      const currentPage = lastPageData.page;
      const totalPages = lastPageData.totalPages;

      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
  });

  const flatCategories =
    queryResult.data?.pages.flatMap((page) => page.items) ?? [];

  return {
    categories: flatCategories,
    queryResult,
  };
}
