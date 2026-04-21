import { getDeliveryById, type DeliveryDetail } from '@/entities/delivery';
import { useGetEntityById } from '@/shared/model';

export function useGetDelivery() {
  return useGetEntityById<DeliveryDetail>({
    queryKey: 'deliveries',
    fetchFn: getDeliveryById,
  });
}
