import type { CitiesResponse, City, CityDetail } from '../model/cityTypes';
import { apiClient, ApiError, statusToI18nKey } from '@/shared/api';

const PER_PAGE = 10;

export async function getCities(page: string | null, name: string | null) {
  return apiClient.get<CitiesResponse>('/erp/v1/cities', {
    params: { page_number: page ?? 1, per_page: PER_PAGE, name },
  });
}

export async function editCity({ id, name }: { id: number; name: string }) {
  return apiClient.put(`/erp/v1/cities/${id}`, { name });
}

export async function getCityById(id: number) {
  return apiClient.get<CityDetail>(`/erp/v1/cities/${id}`);
}

export async function createCity(payload: City) {
  return apiClient.post('/erp/v1/cities', payload);
}

export async function getInfiniteCities(page: string, name?: string) {
  const response = await getCities(page, name ?? null);

  if (!response.isSuccess || !response.data) {
    throw new ApiError(statusToI18nKey(response.statusCode));
  }
  const { data } = response;

  return {
    items: data.data!,
    page: data.meta.current_page,
    pageSize: PER_PAGE,
    totalPages: Math.max(data.meta.total / PER_PAGE, 1),
    totalCount: data.meta.total,
  };
}
