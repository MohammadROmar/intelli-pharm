import type {
  DeliveryListItem,
  DeliveryListResponse,
} from '@/entities/delivery';
import { useGetEntities } from '@/shared/model';

export function useGetDeliveries() {
  return useGetEntities<DeliveryListResponse, DeliveryListItem>({
    queryKey: 'deliveries',
    module: 'planner',
  });
}
