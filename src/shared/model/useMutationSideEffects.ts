import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import type { ApiError, ApiResponse } from '../api';
import { createDomainQueryKeys } from './queryKeys';

type ActionType = 'create' | 'delete' | 'edit';

type UseMutationSideEffectsProps = {
  action: ActionType;
  queryKey: string;
  translationKey: string;
  navigatePath?: string;
};

export function useMutationSideEffects({
  action,
  queryKey,
  translationKey,
  navigatePath,
}: UseMutationSideEffectsProps) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { t: tErrors } = useTranslation('errors');

  const queryKeys = createDomainQueryKeys(queryKey);

  const onSuccess = (response: unknown) => {
    const id = (response as ApiResponse<{ id?: number }>)?.data?.id;

    toast.success(t(`toasts.${action}.title`), {
      description: t(`toasts.${action}.description`, {
        item: t(`entities.${translationKey}`),
      }),
      action:
        navigatePath && id !== undefined
          ? {
              label: t('toasts.show'),
              onClick: () => navigate(`${navigatePath}/${id}`),
            }
          : undefined,
    });

    queryClient.invalidateQueries({ queryKey: queryKeys.all });
  };

  const onError = (error: ApiError) => {
    toast.error(t(`toasts.${action}.error`), {
      description: tErrors(error.i18nKey),
    });
  };

  return { onSuccess, onError };
}
