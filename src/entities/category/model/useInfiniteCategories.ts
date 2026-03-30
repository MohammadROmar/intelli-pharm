import type { CategoryListItem } from './categoryTypes';
import { getInfiniteCategories } from '../api';
import { useInfiniteEntities } from '@/shared/model';

export function useInfiniteCategories(searchTerm: string) {
  return useInfiniteEntities<CategoryListItem>({
    queryKey: 'categories',
    searchTerm,
    queryFn: getInfiniteCategories,
  });
}
