import type { RestockPayload } from '../model/restockTypes';
import { apiClient } from '@/shared/api';

export async function restockMedicine(id: number, payload: RestockPayload) {
  return apiClient.post(`/erp/v1/medicines/${id}/restock`, payload);
}
