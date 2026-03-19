import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { getCategory, type CategoryListItem } from '@/entities/category';
import type { ApiError, ApiResponse } from '@/shared/api';

export function useGetCategory() {
  const { id } = useParams();

  const employeeId = Number(id);
  const isValidId = !isNaN(employeeId);

  return useQuery<ApiResponse<CategoryListItem>, ApiError>({
    queryKey: ['categories', `id-${id}`],
    queryFn: () => getCategory(employeeId),
    enabled: isValidId,
  });
}
