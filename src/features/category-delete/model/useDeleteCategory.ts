import { useMutation } from '@tanstack/react-query';
import { deleteCategory } from '../api/deleteCategory';

export function useDeleteCategory() {
  return useMutation({ mutationFn: deleteCategory });
}
