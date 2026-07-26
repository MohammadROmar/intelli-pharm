import type { RestockPayload } from '../model/restockTypes';
import { apiClient } from '@/shared/api';

export async function restockMedicine(id: number, payload: RestockPayload) {
  await apiClient.post(`/erp/v1/mesxsxdicines/${id}/restock`, payload);
}
