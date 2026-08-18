import { apiClient } from '@/shared/api';

import type { RestockPayload } from '../model/restockTypes';

export async function restockMedicine(id: number, payload: RestockPayload) {
  await apiClient.put(`/erp/v1/medicines/${id}/stocks`, payload);
}
