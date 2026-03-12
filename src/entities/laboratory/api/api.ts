import type { Laboratory, LaboratoryListItem } from '../model/laboratoryTypes';
import { apiClient } from '@/shared/api';

export async function getLaboratories(): Promise<LaboratoryListItem[]> {
  const { data } = await apiClient.get('/erp/v1/laboratories');
  return data;
}

export async function createLaboratory(payload: Laboratory) {
  const { data } = await apiClient.post('/erp/v1/laboratories', payload);
  return data;
}

export async function updateLaboratory(id: number, payload: Laboratory) {
  const { data } = await apiClient.put(`/erp/v1/laboratories/${id}`, payload);
  return data;
}

export async function deleteLaboratory(id: number) {
  await apiClient.delete(`/erp/v1/laboratories/${id}`);
}
