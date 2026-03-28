import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { deleteCategory } from '@/entities/category';
import type { ApiError, ApiResponse } from '@/shared/api';

export function useDeleteCategory() {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation<ApiResponse<unknown>, ApiError, number>({
    mutationFn: deleteCategory,

    onSuccess: () => {
      toast.success(t('common.toasts.delete.title'), {
        description: t('common.toasts.delete.description', {
          item: t('categoriesPage.category'),
        }),
      });

      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },

    onError: (error) => {
      toast.error(t('common.toasts.delete.error'), {
        description: t(error.i18nKey),
      });
    },
  });
}
