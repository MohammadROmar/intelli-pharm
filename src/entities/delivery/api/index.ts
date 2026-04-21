import type { DeliveryDetail } from '../model/deliveryTypes';
import { apiClient } from '@/shared/api';

export function getDeliveryById(id: number) {
  return apiClient.get<DeliveryDetail>(`/planner/v1/deliveries/${id}`);
}
