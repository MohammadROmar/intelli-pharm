import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { editLaboratory } from '@/entities/laboratory';
import type { ApiError, ApiResponse } from '@/shared/api';

export function useEditLaboratory() {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const naviagte = useNavigate();

  return useMutation<
    ApiResponse<unknown>,
    ApiError,
    { id: number; name: string }
  >({
    mutationFn: editLaboratory,

    onSuccess: () => {
      toast.success(t('laboratoriesPage.edit.success.title'), {
        description: t('laboratoriesPage.edit.success.description'),
      });
      queryClient.invalidateQueries({ queryKey: ['laboratories'] });
      naviagte('/dashboard/laboratories');
    },

    onError: (error) => {
      toast.error(t('laboratoriesPage.edit.error'), {
        description: t(error.i18nKey),
      });
    },
  });
}
