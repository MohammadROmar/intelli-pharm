import type { EditOfferDto, CreateOfferDto } from '../model/offerTypes';
import { apiClient } from '@/shared/api';

export async function createOffer(payload: CreateOfferDto) {
  return apiClient.post('/erp/v1/offers', payload);
}

export async function editOffer(id: number, payload: EditOfferDto) {
  return apiClient.put(`/erp/v1/offers/${id}`, payload);
}
