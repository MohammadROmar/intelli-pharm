import type { CategoryDetail } from './categoryTypes';
import { useSuspenseGetEntityById } from '@/shared/model';

export function useGetCategorySuspense(id: number) {
  return useSuspenseGetEntityById<CategoryDetail>({
    id,
    queryKey: 'categories',
    endpoint: '/erp/v1/categories',
    withDualLanguage: true,
  });
}
