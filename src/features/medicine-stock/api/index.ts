import { apiClient } from '@/shared/api';

import type { StockPayload } from '../model/stockTypes';

export async function restockMedicine(id: number, payload: StockPayload) {
  await apiClient.post(`/erp/v1/medicines/${id}/restock`, payload);
}

export async function updateMedicineStock(id: number, payload: StockPayload) {
  await apiClient.put(`/erp/v1/medicines/${id}/stocks`, payload);
}
