import { useTranslation } from 'react-i18next';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import type { ApiError } from '../api';

type ActionType = 'create' | 'delete' | 'edit';

type UseMutationSideEffectsProps = {
  action: ActionType;
  queryKey: string;
  translationKey: string;
};

export function useMutationSideEffects({
  action,
  queryKey,
  translationKey,
}: UseMutationSideEffectsProps) {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const onSuccess = () => {
    toast.success(t(`common.toasts.${action}.title`), {
      description: t(`common.toasts.${action}.description`, {
        item: t(translationKey),
      }),
    });

    queryClient.invalidateQueries({ queryKey: [queryKey] });
  };

  const onError = (error: ApiError) => {
    toast.error(t(`common.toasts.${action}.error`), {
      description: t(error.i18nKey),
    });
  };

  return { onSuccess, onError };
}
