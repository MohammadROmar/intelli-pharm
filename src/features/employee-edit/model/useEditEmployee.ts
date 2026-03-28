import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { UpdateEmployeeFormData } from '@/entities/employee';
import { updateEmployee } from '@/entities/employee';
import type { ApiError, ApiResponse } from '@/shared/api';

export function useEditEmployee() {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const naviagte = useNavigate();

  return useMutation<
    ApiResponse<unknown>,
    ApiError,
    { id: number; payload: UpdateEmployeeFormData }
  >({
    mutationFn: updateEmployee,

    onSuccess: () => {
      toast.success(t('common.toasts.edit.title'), {
        description: t('common.toasts.edit.description', {
          item: t('employeesPage.employee'),
        }),
      });

      queryClient.invalidateQueries({ queryKey: ['employees'] });
      naviagte('/dashboard/employees');
    },

    onError: (error) => {
      toast.error(t('common.toasts.edit.error'), {
        description: t(error.i18nKey),
      });
    },
  });
}
