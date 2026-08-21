import { medicineToFormData } from '../lib/utils';
import type {
  MedicineFormData,
  MedicineResponse,
  BarcodeScanResult,
} from '../model/medicineTypes';
import { apiClient, unwrapPaginatedApiResponse } from '@/shared/api';

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

export async function getMedicines(
  params: Record<string, string | number | null | undefined>,
) {
  return apiClient.get<MedicineResponse>('/erp/v1/medicines', { params });
}

export async function getMedicineByBarcode(barcode: string) {
  return apiClient.get<BarcodeScanResult>(
    `/erp/v1/medicines/barcode/${encodeURIComponent(barcode)}`,
  );
}

export async function getInfiniteMedicines(page_number: string, name?: string) {
  const response = await getMedicines({ page_number, name });

  return unwrapPaginatedApiResponse(response);
}
