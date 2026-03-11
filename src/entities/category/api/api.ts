import type { Category, CategoryListItem } from '../model/categoryTypes';
import { apiClient } from '@/shared/api';

export async function getCategories(): Promise<CategoryListItem[]> {
  const { data } = await apiClient.get('/erp/v1/categorys');
  return data;
}

export async function createCategory(payload: Category) {
  const { data } = await apiClient.post('/erp/v1/categorys', payload);
  return data;
}

export async function updateCategory(id: number, payload: Partial<Category>) {
  const { data } = await apiClient.put(`/erp/v1/categorys/${id}`, payload);
  return data;
}

export async function deleteCategory(id: number) {
  await apiClient.delete(`/erp/v1/categorys/${id}`);
}
