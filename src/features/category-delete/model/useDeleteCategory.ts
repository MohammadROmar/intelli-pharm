import { useMutation } from '@tanstack/react-query';

import { deleteCategory } from '@/entities/category';

export function useDeleteCategory() {
  return useMutation({
    mutationFn: deleteCategory,
  });
}
