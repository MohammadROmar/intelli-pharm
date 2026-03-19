import type {
  FormValues,
  ImageFile,
  MedicineResponse,
} from '../model/medicineTypes';
import { apiClient } from '@/shared/api';

export async function createMedicine(values: FormValues, images: ImageFile[]) {
  const fd = new FormData();
  fd.append('name', values.name);
  fd.append('category_id', values.category_id);
  fd.append('price', values.price);
  fd.append('is_imported', values.is_imported ? '1' : '0');
  fd.append('is_active', values.is_active ? '1' : '0');
  fd.append('is_alternative', values.is_alternative ? '1' : '0');
  if (values.note) fd.append('note', values.note);

  values.stocks.forEach((s, i) => {
    fd.append(`stocks[${i}][warehouse_id]`, s.warehouse_id);
    fd.append(`stocks[${i}][quantity]`, s.quantity);
    fd.append(`stocks[${i}][expiry_date]`, s.expiry_date);
  });

  images.forEach((img) => fd.append('images[]', img.file));

  console.log(Object.fromEntries(fd));
}

export async function getMedicineById(id: number) {
  const { data } = await apiClient.get(`/erp/v1/medicines${id}`);
  return data;
}

export async function getMedicines(page: string | null, name: string | null) {
  return apiClient.get<MedicineResponse>('/erp/v1/medicines', {
    params: { page_number: page ?? 1, per_page: 10, name },
  });
}

export async function deleteMedicine(id: number) {
  return apiClient.delete(`/erp/v1/medicines/${id}`);
}
