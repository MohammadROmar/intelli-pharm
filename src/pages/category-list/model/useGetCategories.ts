import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { getCategories, type CategoryListResponse } from '@/entities/category';
import type { ApiError, ApiResponse } from '@/shared/api';

export function useGetCategories() {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page');
  const name = searchParams.get('name');

  return useQuery<ApiResponse<CategoryListResponse>, ApiError>({
    queryKey: ['categories', { page, name }],
    queryFn: () => getCategories(page, name),
    placeholderData: (prev) => prev,
  });
}
