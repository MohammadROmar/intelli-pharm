import { createCategory, type Category } from '@/entities/category';
import { useCreateEntity } from '@/shared/model';

export function useCreateCategory() {
  return useCreateEntity<Category>({
    queryKey: 'categories',
    mutationFn: createCategory,
    translationKey: 'categoriesPage.category',
  });
}
