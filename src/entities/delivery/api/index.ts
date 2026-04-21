import type {
  DeliveryDetail,
  AssignDeliveryPayload,
} from '../model/deliveryTypes';
import { apiClient } from '@/shared/api';

export async function getDeliveryById(id: number) {
  return apiClient.get<DeliveryDetail>(`/planner/v1/deliveries/${id}`);
}

export async function assignDeliveryTask(payload: AssignDeliveryPayload) {
  return apiClient.post('/planner/v1/deliveries/assign-delivery-task', payload);
}
