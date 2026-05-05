import type { City } from '../model/cityTypes';
import {
  apiClient,
  ApiError,
  statusToI18nKey,
  type PaginatedResponse,
} from '@/shared/api';

export async function editCity({ id, name }: { id: number; name: City }) {
  return apiClient.put(`/erp/v1/cities/${id}`, name);
}

export async function createCity(payload: City) {
  return apiClient.post('/erp/v1/cities', payload);
}

type InfiniteCities = PaginatedResponse<{ id: number; name: string }>;

export async function getInfiniteCities(page_number: string, name?: string) {
  const response = await apiClient.get<InfiniteCities>('/erp/v1/cities', {
    params: { page_number, name },
  });

  if (!response.isSuccess || !response.data) {
    throw new ApiError(statusToI18nKey(response.statusCode));
  }
  const { data } = response;

  return {
    items: data.data,
    page: data.meta.current_page,
    pageSize: data.meta.per_page,
    totalPages: Math.max(data.meta.total / data.meta.per_page, 1),
    totalCount: data.meta.total,
  };
}
