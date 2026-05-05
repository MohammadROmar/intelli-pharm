import type { DeliveryDetail } from '@/entities/delivery';
import { useGetEntityById } from '@/shared/model';

export function useGetDelivery() {
  return useGetEntityById<DeliveryDetail>({
    queryKey: 'deliveries',
    endpoint: '/planner/v1/deliveries',
  });
}
