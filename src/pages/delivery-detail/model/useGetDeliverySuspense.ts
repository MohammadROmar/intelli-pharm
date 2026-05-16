import type { DeliveryDetail } from '@/entities/delivery';
import { useSuspenseGetEntityById } from '@/shared/model';

export function useGetDeliverySuspense(id: number) {
  return useSuspenseGetEntityById<DeliveryDetail>({
    id,
    queryKey: 'deliveries',
    endpoint: '/planner/v1/deliveries',
  });
}
