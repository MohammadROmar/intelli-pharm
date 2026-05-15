import { changeOrderStatus, type OrderStatus } from '@/entities/order';
import { useEditEntity } from '@/shared/model';

export function useChangeOrderStatus() {
  return useEditEntity<{ id: number; status: OrderStatus }>({
    queryKey: 'orders',
    mutationFn: changeOrderStatus,
    translationKey: 'order',
  });
}
