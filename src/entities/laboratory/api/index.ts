import type {
  LaboratoriesResponse,
  Laboratory,
  LaboratoryDetail,
} from '../model/laboratoryTypes';
import { apiClient, ApiError, statusToI18nKey } from '@/shared/api';

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

export async function getInfiniteLaboratories(page: string, name?: string) {
  const response = await getLaboratories(page, name ?? null);

  if (!response.isSuccess || !response.data) {
    throw new ApiError(statusToI18nKey(response.statusCode));
  }
  const { data } = response;

  return {
    items: data.data!,
    page: data.current_page,
    pageSize: PER_PAGE,
    totalPages: Math.max(data.total / PER_PAGE, 1),
    totalCount: data.total,
  };
}
