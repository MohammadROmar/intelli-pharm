import type {
  Category,
  CategoryListResponse,
  CategoryDetail,
} from '../model/categoryTypes';
import { apiClient, ApiError, statusToI18nKey } from '@/shared/api';

export function getCategoryById(id: number) {
  return apiClient.get<CategoryDetail>(`/erp/v1/categories/${id}`);
}

export async function createCategory(payload: Category) {
  return apiClient.post('/erp/v1/categories', payload);
}

export async function editCategory({
  id,
  payload,
}: {
  id: number;
  payload: Partial<Category>;
}) {
  return apiClient.put(`/erp/v1/categories/${id}`, payload);
}

export async function getInfiniteCategories(
  page_number: string,
  name?: string,
) {
  const response = await apiClient.get<CategoryListResponse>(
    '/erp/v1/categories',
    { params: { page_number, name } },
  );

  if (!response.isSuccess || !response.data) {
    throw new ApiError(statusToI18nKey(response.statusCode));
  }

  const { data: categories, meta } = response.data;

  return {
    items: categories,
    page: meta.current_page,
    pageSize: meta.per_page,
    totalPages: Math.max(meta.total / meta.per_page, 1),
    totalCount: meta.total,
  };
}
