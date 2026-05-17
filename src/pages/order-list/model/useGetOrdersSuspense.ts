import type { OrderListItem, OrderListResponse } from '@/entities/order';
import { useOrderFilters } from './useOrderFilters';
import { useSuspenseGetEntities } from '@/shared/model';

export function useGetOrdersSuspense() {
  const { filters } = useOrderFilters();

  return useSuspenseGetEntities<OrderListResponse, OrderListItem>({
    queryKey: 'orders',
    filters,
  });
}
