import { useTranslation } from 'react-i18next';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { editCategory, type Category } from '@/entities/category';
import type { ApiError, ApiResponse } from '@/shared/api';
import { useNavigate } from 'react-router-dom';

export function useEditCategory() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { t } = useTranslation();

  return useMutation<
    ApiResponse<unknown>,
    ApiError,
    { id: number; payload: Category }
  >({
    mutationFn: editCategory,
    onSuccess: () => {
      toast.success(t('categoriesPage.edit.success.title'), {
        description: t('categoriesPage.edit.success.description'),
      });
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      navigate('/dashboard/categories');
    },
    onError: (error) => {
      toast.error(t('categoriesPage.edit.error'), {
        description: t(error.i18nKey),
      });
    },
  });
}
