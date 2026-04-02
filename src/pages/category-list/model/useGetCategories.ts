import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import {
  getCategories,
  type CategoryFilters,
  type CategoryListResponse,
} from '@/entities/category';
import type { ApiError, ApiResponse } from '@/shared/api';
import { getPage, getPerPage } from '@/shared/lib';

export function useGetCategories() {
  const [searchParams] = useSearchParams();

  const page_number = getPage(searchParams);
  const per_page = getPerPage(searchParams);

  const name = searchParams.get('name');
  const parentId = searchParams.get('parent_id');

  const filters: CategoryFilters = { name, parent_id: parentId };

  return useQuery<ApiResponse<CategoryListResponse>, ApiError>({
    queryKey: ['categories', { page_number, per_page, filters }],
    queryFn: () => getCategories({ ...filters, page_number, per_page }),
    placeholderData: (prev) => {
      const data = prev?.data?.data;
      return data && data.length > 0 ? prev : undefined;
    },
  });
}
