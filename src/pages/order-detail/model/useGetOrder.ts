import type { OrderDetail } from '@/entities/order';
import { useGetEntityById } from '@/shared/model';

export function useGetOrder() {
  return useGetEntityById<OrderDetail>({
    queryKey: 'orders',
    endpoint: '/erp/v1/orders',
  });
}
