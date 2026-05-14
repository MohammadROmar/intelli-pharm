import { useInfiniteQuery } from '@tanstack/react-query';

import { getNextPageParam } from '@/shared/lib';
import { createDomainQueryKeys } from './queryKeys';

type InfiniteQueryResponse<T> = {
  items: T[];
  page: number;
  pageSize: number;
  totalPages: number;
  totalCount: number;
};

type Props<T> = {
  queryKey: string;
  searchTerm: string;
  queryFn: (
    page: string,
    searchTerm?: string,
  ) => Promise<InfiniteQueryResponse<T>>;
};

export function useInfiniteEntities<T>({
  queryKey,
  queryFn,
  searchTerm,
}: Props<T>) {
  const queryKeys = createDomainQueryKeys(queryKey);

  const queryResult = useInfiniteQuery({
    queryKey: queryKeys.infinite({ searchTerm }),
    initialPageParam: 1,
    getNextPageParam,
    queryFn: async ({ pageParam = 1 }) =>
      queryFn(pageParam.toString(), searchTerm),
  });

  const flatEnteties =
    queryResult.data?.pages.flatMap((page) => page.items) ?? [];

  return {
    entities: flatEnteties,
    queryResult,
  };
}
