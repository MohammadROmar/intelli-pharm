import type {
  Region,
  RegionDetail,
  RegionsListResponse,
} from '../model/regionTypes';
import { apiClient, ApiError, statusToI18nKey } from '@/shared/api';

export async function getRegionById(id: number) {
  return apiClient.get<RegionDetail>(`/erp/v1/regions/${id}`);
}

export async function createRegion(payload: Region) {
  return apiClient.post('/erp/v1/regions', payload);
}

export async function editRegion({
  id,
  name,
  city_id,
}: { id: number } & Region) {
  return apiClient.put(`/erp/v1/regions/${id}`, { name, city_id });
}

export async function getInfiniteRegions(page_number: string, name?: string) {
  const response = await apiClient.get<RegionsListResponse>('/erp/v1/regions', {
    params: { page_number, name },
  });

  if (!response.isSuccess || !response.data) {
    throw new ApiError(statusToI18nKey(response.statusCode));
  }

  const { data, meta } = response.data;

  return {
    items: data,
    page: meta.current_page,
    pageSize: meta.per_page,
    totalPages: Math.max(meta.total / meta.per_page, 1),
    totalCount: meta.total,
  };
}
