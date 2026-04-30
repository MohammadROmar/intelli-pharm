import type { Gift, GiftPayload } from '../model/giftTypes';
import { apiClient } from '@/shared/api';

export async function getGiftById(id: number) {
  return apiClient.get<Gift>(`/erp/v1/gifts/${id}`);
}

export async function createGift(payload: GiftPayload) {
  return apiClient.post('/erp/v1/gifts', payload);
}

export async function editGift(id: number, payload: GiftPayload) {
  return apiClient.put(`/erp/v1/gifts/${id}`, payload);
}

export async function deleteGift(id: number) {
  return apiClient.delete(`/erp/v1/gifts/${id}`);
}
