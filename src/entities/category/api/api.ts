import type { Category, CategoryListResponse } from '../model/categoryTypes';
import { apiClient, ApiError, statusToI18nKey } from '@/shared/api';

const PER_PAGE = 10;

export async function getCategories(page: string | null, name: string | null) {
  return apiClient.get<CategoryListResponse>('/erp/v1/categories', {
    params: { page_number: page ?? 1, per_page: PER_PAGE, name },
  });
}

export async function createCategory(payload: Category) {
  return apiClient.post('/erp/v1/categories', payload);
}

export async function updateCategory(id: number, payload: Partial<Category>) {
  return apiClient.put(`/erp/v1/categories/${id}`, payload);
}

export async function deleteCategory(id: number) {
  return apiClient.delete(`/erp/v1/categories/${id}`);
}

export async function getInfinityCategories(page: string, search?: string) {
  const response = await getCategories(page, search ?? null);

  if (!response.isSuccess || !response.data) {
    throw new ApiError(statusToI18nKey(response.statusCode));
  }
  const { data: categories, meta } = response.data;

  return {
    items: categories,
    page: meta.current_page,
    pageSize: PER_PAGE,
    totalPages: Math.max(meta.total / PER_PAGE, 1),
    totalCount: meta.total,
  };
}
