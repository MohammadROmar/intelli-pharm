import {
  assignDeliveryTask,
  type AssignDeliveryPayload,
} from '@/entities/delivery';
import { useCreateEntity } from '@/shared/model';

export function useAssignDelivery() {
  return useCreateEntity<AssignDeliveryPayload>({
    queryKey: 'deliveries',
    mutationFn: assignDeliveryTask,
    translationKey: 'deliveriesPage.delivery',
  });
}
