import type {
  DeliveryListItem,
  DeliveryListResponse,
} from '@/entities/delivery';
import { useSuspenseGetEntities } from '@/shared/model';

export function useGetDeliveriesSuspense() {
  return useSuspenseGetEntities<DeliveryListResponse, DeliveryListItem>({
    module: 'planner',
    queryKey: 'deliveries',
  });
}
