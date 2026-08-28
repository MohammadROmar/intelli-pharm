import type { GiftPayload } from '../model/giftTypes';
import { apiClient } from '@/shared/api';

export async function createGift(payload: GiftPayload) {
  return apiClient.post('/erp/v1/gifts', payload);
}

export async function editGift(id: number, payload: GiftPayload) {
  return apiClient.put(`/erp/v1/gifts/${id}`, payload);
}
