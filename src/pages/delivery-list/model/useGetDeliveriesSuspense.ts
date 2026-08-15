import type {
  DeliveryListItem,
  DeliveryListResponse,
} from '@/entities/delivery';
import { useSuspenseGetEntities } from '@/shared/model';

import { useDeliveryFilters } from './useDeliveryFilters';

export function useGetDeliveriesSuspense() {
  const { filters } = useDeliveryFilters();

  return useSuspenseGetEntities<DeliveryListResponse, DeliveryListItem>({
    module: 'planner',
    queryKey: 'deliveries',
    filters,
  });
}
