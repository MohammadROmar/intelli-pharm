import type { Laboratory, LaboratoryListItem } from '../model/laboratoryTypes';
import { apiClient } from '@/shared/api';

export async function getLaboratories() {
  return apiClient.get<LaboratoryListItem[]>('/erp/v1/laboratories');
}

export async function createLaboratory(payload: Laboratory) {
  return apiClient.post('/erp/v1/laboratories', payload);
}

export async function updateLaboratory(id: number, payload: Laboratory) {
  return apiClient.put(`/erp/v1/laboratories/${id}`, payload);
}

export async function deleteLaboratory(id: number) {
  await apiClient.delete(`/erp/v1/laboratories/${id}`);
}
