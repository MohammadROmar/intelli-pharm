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
  params?: Record<string, unknown>;
  queryFn: (
    page: string,
    searchTerm?: string,
    params?: Record<string, unknown>,
  ) => Promise<InfiniteQueryResponse<T>>;
};

export function useInfiniteEntities<T>({
  queryKey,
  queryFn,
  params,
  searchTerm,
}: Props<T>) {
  const queryKeys = createDomainQueryKeys(queryKey);

  const queryResult = useInfiniteQuery({
    queryKey: queryKeys.infinite({ searchTerm, ...params }),
    initialPageParam: 1,
    getNextPageParam,
    queryFn: async ({ pageParam = 1 }) =>
      queryFn(pageParam.toString(), searchTerm, params),
  });

  const flatEnteties =
    queryResult.data?.pages.flatMap((page) => page.items) ?? [];

  return {
    entities: flatEnteties,
    queryResult,
  };
}
