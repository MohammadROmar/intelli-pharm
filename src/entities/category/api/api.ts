import type { Category, CategoryListResponse } from '../model/categoryTypes';
import { apiClient } from '@/shared/api';

export async function getCategories(page: string | null, name: string | null) {
  return apiClient.get<CategoryListResponse>('/erp/v1/categories', {
    params: { page_number: page ?? 1, per_page: 10, name },
  });
}

export async function createCategory(payload: Category) {
  return apiClient.post('/erp/v1/categories', payload);
}

export async function updateCategory(id: number, payload: Partial<Category>) {
  return apiClient.put(`/erp/v1/categories/${id}`, payload);
}

export async function deleteCategory(id: number) {
  await apiClient.delete(`/erp/v1/categories/${id}`);
}
