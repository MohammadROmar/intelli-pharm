import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { deleteEmployee } from '@/entities/employee';
import { ApiError, type ApiResponse } from '@/shared/api';

export function useDeleteEmployee() {
  const queryClient = useQueryClient();

  const { t } = useTranslation();

  return useMutation<ApiResponse<unknown>, ApiError, number>({
    mutationFn: deleteEmployee,
    onSuccess: () => {
      toast.success(t('common.toasts.delete.title'), {
        description: t('common.toasts.delete.description', {
          item: t('employeesPage.employee'),
        }),
      });

      queryClient.invalidateQueries({ queryKey: ['employees'] });
    },
    onError: (error) => {
      toast.error(t('common.toasts.delete.error'), {
        description: t(error.i18nKey),
      });
    },
  });
}
