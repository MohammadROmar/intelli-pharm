import type { CategoryDetail } from './categoryTypes';
import { getCategoryById } from '../api';
import { useGetEntityById } from '@/shared/model';

export function useGetCategory() {
  return useGetEntityById<CategoryDetail>({
    queryKey: 'categories',
    fetchFn: getCategoryById,
  });
}
