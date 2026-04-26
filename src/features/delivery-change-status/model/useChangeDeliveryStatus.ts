import {
  changeDelieryStatus,
  type ChangeDeliveryStatusPayload,
} from '@/entities/delivery';
import { useEditEntity } from '@/shared/model';

export function useChangeDeliveryStatus() {
  return useEditEntity<{ id: number; payload: ChangeDeliveryStatusPayload }>({
    queryKey: 'deliveries',
    mutationFn: changeDelieryStatus,
    translationKey: 'deliveriesPage.delivery',
  });
}
