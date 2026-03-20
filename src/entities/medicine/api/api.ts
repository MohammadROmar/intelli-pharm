import type {
  FormValues,
  ImageFile,
  Medicine,
  MedicineResponse,
} from '../model/medicineTypes';
import { apiClient, ApiError, statusToI18nKey } from '@/shared/api';

const PER_PAGE = 10;

export async function postMedicine({
  values,
  images,
  id,
}: {
  values: FormValues;
  images: ImageFile[];
  id?: number;
}) {
  const fd = new FormData();
  fd.append('name', values.name);
  fd.append('category_id', values.category_id);
  fd.append('price', values.price);
  fd.append('is_imported', values.is_imported ? '1' : '0');
  fd.append('is_active', values.is_active ? '1' : '0');
  fd.append('is_alternative', values.is_alternative ? '1' : '0');

  if (values.note) fd.append('note', values.note);
  if (values.is_alternative && values.is_alternative_to_id)
    fd.append('is_alternative_to_id', values.is_alternative_to_id.toString());

  values.stocks.forEach((s, i) => {
    fd.append(`stocks[${i}][warehouse_id]`, s.warehouse_id);
    fd.append(`stocks[${i}][quantity]`, s.quantity);
    fd.append(`stocks[${i}][expiry_date]`, s.expiry_date);
  });

  images.forEach((img) => fd.append('images[]', img.file));

  const medthodFn = id ? apiClient.post : apiClient.put;

  return medthodFn(`/erp/v1/medicines${id ? `/${id}` : ''}`, fd, {
    headers: { 'Content-Type': undefined },
  });
}

export async function getMedicineById(id: number) {
  return apiClient.get<Medicine>(`/erp/v1/medicines/${id}`);
}

export async function getMedicines(page: string | null, name: string | null) {
  return apiClient.get<MedicineResponse>('/erp/v1/medicines', {
    params: { page_number: page ?? 1, per_page: PER_PAGE, name },
  });
}

export async function deleteMedicine(id: number) {
  return apiClient.delete(`/erp/v1/medicines/${id}`);
}

export async function getInfiniteMedicines(page: string, search?: string) {
  const response = await getMedicines(page, search ?? null);
  console.log(response);

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
