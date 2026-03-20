import { useInfiniteQuery } from '@tanstack/react-query';

import { getInfiniteMedicines } from '../api/api';
import { getNextPageParam } from '@/shared/lib';

export function useInfiniteMedicines(searchTerm: string) {
  const queryResult = useInfiniteQuery({
    queryKey: ['medicines', searchTerm],
    initialPageParam: 1,
    getNextPageParam,
    queryFn: async ({ pageParam = 1 }) =>
      getInfiniteMedicines(pageParam.toString(), searchTerm),
  });

  const flatMedicines =
    queryResult.data?.pages.flatMap((page) => page.items) ?? [];

  return {
    medicines: flatMedicines,
    queryResult,
  };
}
