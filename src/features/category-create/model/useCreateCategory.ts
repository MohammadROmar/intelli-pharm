import { createCategory, type CategoryDto } from '@/entities/category';
import { useCreateEntity } from '@/shared/model';

export function useCreateCategory() {
  return useCreateEntity<CategoryDto>({
    queryKey: 'categories',
    mutationFn: createCategory,
    translationKey: 'category',
  });
}
