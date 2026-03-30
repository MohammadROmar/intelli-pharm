import { pharmacyToPayload } from '../lib/utils';
import type {
  PharmaciesResponse,
  Pharmacy,
  PharmacyDetail,
  PharmacyFilters,
} from '../model/pharmacyTypes';
import { apiClient, ApiError, statusToI18nKey } from '@/shared/api';

const PER_PAGE = 10;

export async function getPharmacies(
  page: string | null,
  filters: PharmacyFilters,
) {
  return apiClient.get<PharmaciesResponse>('/erp/v1/pharmacies', {
    params: { page_number: page ?? 1, per_page: PER_PAGE, ...filters },
  });
}

export async function editPharmacy({
  id,
  pharmacy,
}: {
  id: number;
  pharmacy: Pharmacy;
}) {
  const payload = pharmacyToPayload(pharmacy);
  return apiClient.put(`/erp/v1/pharmacies/${id}`, payload);
}

export async function getPharmacyById(id: number) {
  return apiClient.get<PharmacyDetail>(`/erp/v1/pharmacies/${id}`);
}

export async function createPharmacy(pharmacy: Pharmacy) {
  const payload = pharmacyToPayload(pharmacy);
  return apiClient.post('/erp/v1/pharmacies', payload);
}

export async function getInfinitePharmacies(page: string, name?: string) {
  const response = await getPharmacies(page, { name });

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
