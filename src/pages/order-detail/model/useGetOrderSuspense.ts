import type { OrderDetail } from '@/entities/order';
import { useSuspenseGetEntityById } from '@/shared/model';

export function useGetOrderSuspense(id: number) {
  return useSuspenseGetEntityById<OrderDetail>({
    id,
    queryKey: 'orders',
    endpoint: '/erp/v1/orders',
  });
}
