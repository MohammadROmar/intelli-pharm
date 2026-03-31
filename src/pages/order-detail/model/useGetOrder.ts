import { getOrderById, type OrderDetail } from '@/entities/order';
import { useGetEntityById } from '@/shared/model';

export function useGetOrder() {
  return useGetEntityById<OrderDetail>({
    queryKey: 'orders',
    fetchFn: getOrderById,
  });
}
