import type {
  Region,
  RegionDetail,
  RegionFilters,
  RegionListItem,
  RegionsListResponse,
} from '../model/regionTypes';
import { apiClient, ApiError, statusToI18nKey } from '@/shared/api';

const PER_PAGE = 10;

export async function getRegions(page: string | null, filters: RegionFilters) {
  return apiClient.get<RegionsListResponse>('/erp/v1/regions', {
    params: { page_number: page ?? 1, per_page: PER_PAGE, ...filters },
  });
}

export async function getRegionById(id: number) {
  return apiClient.get<RegionDetail>(`/erp/v1/regions/${id}`);
}

export async function createRegion(payload: Region) {
  return apiClient.post('/erp/v1/regions', payload);
}

export async function editRegion({ id, name, city_id }: RegionListItem) {
  return apiClient.put(`/erp/v1/regions/${id}`, { name, city_id });
}

export async function getInfiniteRegions(page: string, name?: string) {
  const response = await getRegions(page, { name });

  if (!response.isSuccess || !response.data) {
    throw new ApiError(statusToI18nKey(response.statusCode));
  }

  const { data, meta } = response.data;

  return {
    items: data,
    page: meta.current_page,
    pageSize: PER_PAGE,
    totalPages: Math.max(meta.total / PER_PAGE, 1),
    totalCount: meta.total,
  };
}
