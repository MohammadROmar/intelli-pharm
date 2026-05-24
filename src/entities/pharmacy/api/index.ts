import { pharmacyToPayload } from '../lib/utils';
import type {
  PharmacyDetail,
  PharmaciesResponse,
} from '../model/pharmacyTypes';
import { apiClient, unwrapPaginatedApiResponse } from '@/shared/api';

export async function editPharmacy({
  id,
  pharmacy,
}: {
  id: number;
  pharmacy: PharmacyDetail;
}) {
  const payload = pharmacyToPayload(pharmacy);
  return apiClient.put(`/erp/v1/pharmacies/${id}`, payload);
}

export async function createPharmacy(pharmacy: PharmacyDetail) {
  const payload = pharmacyToPayload(pharmacy);
  return apiClient.post('/erp/v1/pharmacies', payload);
}

export async function getInfinitePharmacies(
  page_number: string,
  name?: string,
  params?: Record<string, unknown>,
) {
  const response = await apiClient.get<PharmaciesResponse>(
    '/erp/v1/pharmacies',
    { params: { page_number, name, ...params } },
  );

  return unwrapPaginatedApiResponse(response);
}
