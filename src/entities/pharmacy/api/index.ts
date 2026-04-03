import { pharmacyToPayload } from '../lib/utils';
import type {
  PharmaciesResponse,
  Pharmacy,
  PharmacyDetail,
} from '../model/pharmacyTypes';
import { apiClient, ApiError, statusToI18nKey } from '@/shared/api';

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

export async function getInfinitePharmacies(
  page_number: string,
  name?: string,
) {
  const response = await apiClient.get<PharmaciesResponse>(
    '/erp/v1/pharmacies',
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
