import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { UpdateEmployeeFormData } from '@/entities/employee';
import { updateEmployee } from '@/entities/employee';
import type { ApiError, ApiResponse } from '@/shared/api';

export function useUpdateEmployee() {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation<
    ApiResponse<unknown>,
    ApiError,
    { id: string; payload: Partial<UpdateEmployeeFormData> }
  >({
    mutationFn: updateEmployee,

    onSuccess: () => {
      toast.success(t('employeesPage.update.success.title'), {
        description: t('employeesPage.update.success.description'),
      });
      queryClient.invalidateQueries({ queryKey: ['employees'] });
    },

    onError: (error) => {
      toast.error(t('employeesPage.update.error'), {
        description: t(error.i18nKey),
      });
    },
  });
}
