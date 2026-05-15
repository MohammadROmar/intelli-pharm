import { useTranslation } from 'react-i18next';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import type { ApiError } from '../api';
import { createDomainQueryKeys } from './queryKeys';

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
  const { t: tErrors } = useTranslation('errors');

  const queryKeys = createDomainQueryKeys(queryKey);

  const onSuccess = () => {
    toast.success(t(`toasts.${action}.title`), {
      description: t(`toasts.${action}.description`, {
        item: t(`entities.${translationKey}`),
      }),
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
