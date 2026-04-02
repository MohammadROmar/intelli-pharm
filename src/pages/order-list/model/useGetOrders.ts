import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { getOrders } from '@/entities/order';
import type { OrderListResponse } from '@/entities/order';
import type { ApiError, ApiResponse } from '@/shared/api';
import { useOrderFilters } from './useOrderFilters';
import { getPage, getPerPage } from '@/shared/lib';

export function useGetOrders() {
  const [searchParams] = useSearchParams();
  const { filters } = useOrderFilters();

  const page_number = getPage(searchParams);
  const per_page = getPerPage(searchParams);

  return useQuery<ApiResponse<OrderListResponse>, ApiError>({
    queryKey: ['crders', { page_number, per_page, filters }],
    queryFn: () => getOrders({ ...filters, page_number, per_page }),
    placeholderData: (prev) => {
      const data = prev?.data?.data;
      return data && data.length > 0 ? prev : undefined;
    },
  });
}
