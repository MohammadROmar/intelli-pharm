import { useSuspenseGetEntityById } from '@/shared/model';

import type { OrderDetail } from './orderTypes';

export function useGetOrderSuspense(id: number) {
  return useSuspenseGetEntityById<OrderDetail>({
    id,
    queryKey: 'orders',
    endpoint: '/erp/v1/orders',
  });
}
