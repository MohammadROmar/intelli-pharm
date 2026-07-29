import { useNavigate } from 'react-router';
import { useMutation, type UseMutationOptions } from '@tanstack/react-query';

import { useMutationSideEffects } from './useMutationSideEffects';
import type { ApiError, ApiResponse } from '../api';

type UseEditEntityOptions<TVariables, TData = ApiResponse<unknown>> = {
  queryKey: string;
  translationKey: string;
  mutationFn: (variables: TVariables) => Promise<TData>;
  redirectTo?: string;
} & Omit<UseMutationOptions<TData, ApiError, TVariables>, 'mutationFn'>;

export function useEditEntity<TVariables, TData = ApiResponse<unknown>>({
  queryKey,
  translationKey,
  mutationFn,
  redirectTo,
  ...mutationOptions
}: UseEditEntityOptions<TVariables, TData>) {
  const navigate = useNavigate();

  const { onSuccess, onError } = useMutationSideEffects({
    action: 'edit',
    queryKey,
    translationKey,
  });

  return useMutation<TData, ApiError, TVariables>({
    mutationFn,
    onSuccess: (response?: unknown) => {
      onSuccess(response);

      if (redirectTo) {
        navigate(redirectTo);
      }
    },
    onError,
    ...mutationOptions,
  });
}
