import { medicineToFormData } from '../lib/utils';
import type { MedicineFilters } from '../model/medicineTypes';
import type {
  Medicine,
  MedicineFormData,
  MedicineResponse,
} from '../model/medicineTypes';
import { apiClient, ApiError, statusToI18nKey } from '@/shared/api';

const PER_PAGE = 10;

export async function createMedicine(data: MedicineFormData) {
  const fd = medicineToFormData(data);
  return apiClient.post('/erp/v1/medicines', fd, {
    headers: { 'Content-Type': undefined },
  });
}

export async function editMedicine(id: number, data: MedicineFormData) {
  const fd = medicineToFormData(data);
  return apiClient.put(`/erp/v1/medicines/${id}`, fd, {
    headers: { 'Content-Type': undefined },
  });
}

export async function getMedicineById(id: number) {
  return apiClient.get<Medicine>(`/erp/v1/medicines/${id}`);
}

export async function getMedicines(
  page: string | null,
  filters: MedicineFilters,
) {
  return apiClient.get<MedicineResponse>('/erp/v1/medicines', {
    params: { page_number: page ?? 1, per_page: PER_PAGE, ...filters },
  });
}

export async function deleteMedicine(id: number) {
  return apiClient.delete(`/erp/v1/medicines/${id}`);
}

export async function getInfiniteMedicines(page: string, name?: string) {
  const response = await getMedicines(page, { name });

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
