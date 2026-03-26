import type {
  LaboratoriesResponse,
  Laboratory,
  LaboratoryDetail,
} from '../model/laboratoryTypes';
import { apiClient } from '@/shared/api';

const PER_PAGE = 10;

export async function getLaboratories(
  page: string | null,
  name: string | null,
) {
  return apiClient.get<LaboratoriesResponse>('/erp/v1/laboratories', {
    params: { page_number: page ?? 1, per_page: PER_PAGE, name },
  });
}

export async function editLaboratory({
  id,
  name,
}: {
  id: number;
  name: string;
}) {
  return apiClient.put(`/erp/v1/laboratories/${id}`, { name });
}

export async function getLaboratoryById(id: number) {
  return apiClient.get<LaboratoryDetail>(`/erp/v1/laboratories/${id}`);
}

export async function createLaboratory(payload: Laboratory) {
  return apiClient.post('/erp/v1/laboratories', payload);
}

export async function updateLaboratory(id: number, payload: Laboratory) {
  return apiClient.put(`/erp/v1/laboratories/${id}`, payload);
}

export async function deleteLaboratory(id: number) {
  return apiClient.delete(`/erp/v1/laboratories/${id}`);
}
