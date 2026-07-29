import type {
  CategoryFilters,
  CategoryListItem,
  CategoryListResponse,
} from '@/entities/category';
import { useSearchParams } from 'react-router';
import { useSuspenseGetEntities } from '@/shared/model';

export function useGetCategoriesSuspense() {
  const [searchParams] = useSearchParams();

  const name = searchParams.get('name');
  const parentId = searchParams.get('parent_id');

  const filters: CategoryFilters = { name, parent_id: parentId };

  return useSuspenseGetEntities<CategoryListResponse, CategoryListItem>({
    queryKey: 'categories',
    filters,
  });
}
