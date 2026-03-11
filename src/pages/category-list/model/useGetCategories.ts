import { useQuery } from '@tanstack/react-query';

import { getCategories } from '@/entities/category';

export function useGetCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });
}
