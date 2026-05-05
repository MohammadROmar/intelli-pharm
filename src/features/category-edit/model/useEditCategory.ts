import { editCategory, type CategoryDto } from '@/entities/category';
import { useEditEntity } from '@/shared/model';

export function useEditCategory(id: number) {
  return useEditEntity<CategoryDto>({
    queryKey: 'categories',
    mutationFn: (payload) => editCategory({ id, payload }),
    translationKey: 'categoriesPage.category',
    redirectTo: `/dashboard/categories/${id}`,
  });
}
