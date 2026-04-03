import type {
  LaboratoriesResponse,
  Laboratory,
  LaboratoryDetail,
} from '../model/laboratoryTypes';
import { apiClient, ApiError, statusToI18nKey } from '@/shared/api';

export async function getLaboratories(
  params: Record<string, string | number | null | undefined>,
) {
  return apiClient.get<LaboratoriesResponse>('/erp/v1/laboratories', {
    params,
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

export async function getInfiniteLaboratories(
  page_number: string,
  name?: string,
) {
  const response = await apiClient.get<LaboratoriesResponse>(
    '/erp/v1/laboratories',
    { params: { page_number, name } },
  );

  if (!response.isSuccess || !response.data) {
    throw new ApiError(statusToI18nKey(response.statusCode));
  }
  const { data } = response;

  return {
    items: data.data!,
    page: data.meta.current_page,
    pageSize: data.meta.per_page,
    totalPages: Math.max(data.meta.total / data.meta.per_page, 1),
    totalCount: data.meta.total,
  };
}
