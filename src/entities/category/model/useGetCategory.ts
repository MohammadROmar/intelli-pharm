import type { CategoryDetail } from './categoryTypes';
import { useGetEntityById } from '@/shared/model';

export function useGetCategory() {
  return useGetEntityById<CategoryDetail>({
    queryKey: 'categories',
    endpoint: '/erp/v1/categories',
    withDualLanguage: true,
  });
}
