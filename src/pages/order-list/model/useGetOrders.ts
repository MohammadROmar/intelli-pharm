import type { OrderListItem, OrderListResponse } from '@/entities/order';
import { useOrderFilters } from './useOrderFilters';
import { useGetEntities } from '@/shared/model';

export function useGetOrders() {
  const { filters } = useOrderFilters();

  return useGetEntities<OrderListResponse, OrderListItem>({
    queryKey: 'orders',
    filters,
  });
}
