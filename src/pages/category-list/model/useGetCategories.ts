import { useSearchParams } from 'react-router-dom';

import type {
  CategoryFilters,
  CategoryListItem,
  CategoryListResponse,
} from '@/entities/category';
import { useGetEntities } from '@/shared/model';

export function useGetCategories() {
  const [searchParams] = useSearchParams();

  const name = searchParams.get('name');
  const parentId = searchParams.get('parent_id');

  const filters: CategoryFilters = { name, parent_id: parentId };

  return useGetEntities<CategoryListResponse, CategoryListItem>({
    queryKey: 'categories',
    filters,
  });
}
