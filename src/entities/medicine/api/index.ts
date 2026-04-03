import { medicineToFormData } from '../lib/utils';
import type {
  BarcodeScanResult,
  Medicine,
  MedicineFormData,
  MedicineResponse,
} from '../model/medicineTypes';
import { apiClient, ApiError, statusToI18nKey } from '@/shared/api';

export async function createMedicine(data: MedicineFormData) {
  const fd = medicineToFormData(data);
  return apiClient.post('/erp/v1/medicines', fd, {
    headers: { 'Content-Type': undefined },
  });
}

export async function editMedicine(id: number, data: MedicineFormData) {
  const fd = medicineToFormData(data, true);
  return apiClient.post(`/erp/v1/medicines/${id}`, fd, {
    headers: { 'Content-Type': undefined },
  });
}

export async function getMedicineById(id: number) {
  return apiClient.get<Medicine>(`/erp/v1/medicines/${id}`);
}

export async function getMedicines(
  params: Record<string, string | number | null | undefined>,
) {
  return apiClient.get<MedicineResponse>('/erp/v1/medicines', { params });
}

export async function getMedicineByBarcode(barcode: string) {
  return apiClient.get<BarcodeScanResult>(
    `/erp/v1/medicines/barcode/${barcode}`,
  );
}

export async function getInfiniteMedicines(page_number: string, name?: string) {
  const response = await getMedicines({ page_number, name });

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
