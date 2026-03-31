import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { getOrders } from '@/entities/order';
import { type OrderFilters, type OrderListResponse } from '@/entities/order';
import type { ApiError, ApiResponse } from '@/shared/api';

export function useGetOrders() {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page');

  const filters: OrderFilters = {};

  return useQuery<ApiResponse<OrderListResponse>, ApiError>({
    queryKey: ['crders', { page, filters }],
    queryFn: () => getOrders(page, filters),
    placeholderData: (prev) => {
      const data = prev?.data?.data;
      return data && data.length > 0 ? prev : undefined;
    },
  });
}
