import type { Offer, EditOfferDto, CreateOfferDto } from '../model/offerTypes';
import { apiClient } from '@/shared/api';

export async function getOfferById(id: number) {
  return apiClient.get<Offer>(`/erp/v1/offers/${id}`);
}

export async function createOffer(payload: CreateOfferDto) {
  return apiClient.post('/erp/v1/offers', payload);
}

export async function editOffer(id: number, payload: EditOfferDto) {
  return apiClient.put(`/erp/v1/offers/${id}`, payload);
}
