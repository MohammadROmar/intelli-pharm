import type { OrderListItem } from './orderTypes';
import { getInfiniteOrders } from '../api';
import { useInfiniteEntities } from '@/shared/model';

export function useInfiniteOrders(searchTerm: string) {
  return useInfiniteEntities<OrderListItem>({
    queryKey: 'orders',
    searchTerm,
    queryFn: getInfiniteOrders,
  });
}
