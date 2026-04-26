import type {
  DeliveryDetail,
  AssignDeliveryPayload,
  ChangeDeliveryStatusPayload,
} from '../model/deliveryTypes';
import { apiClient } from '@/shared/api';

type ChangeDelieryStatus = { id: number; payload: ChangeDeliveryStatusPayload };

export async function getDeliveryById(id: number) {
  return apiClient.get<DeliveryDetail>(`/planner/v1/deliveries/${id}`);
}

export async function assignDeliveryTask(payload: AssignDeliveryPayload) {
  return apiClient.post('/planner/v1/deliveries/assign-delivery-task', payload);
}

export async function changeDelieryStatus({
  id,
  payload,
}: ChangeDelieryStatus) {
  return apiClient.patch(`/planner/v1/deliveries/${id}/change-status`, payload);
}
