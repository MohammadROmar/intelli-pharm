import { useTranslation } from 'react-i18next';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { createCategory, type Category } from '@/entities/category';
import type { ApiError, ApiResponse } from '@/shared/api';

export function useCreateCategory() {
  const queryClient = useQueryClient();

  const { t } = useTranslation();

  return useMutation<ApiResponse<unknown>, ApiError, Category>({
    mutationFn: createCategory,
    onSuccess: () => {
      toast.success(t('categoriesPage.create.success.title'), {
        description: t('categoriesPage.create.success.description'),
      });
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
    onError: (error) => {
      toast.error(t('categoriesPage.create.error'), {
        description: t(error.i18nKey),
      });
    },
  });
}
