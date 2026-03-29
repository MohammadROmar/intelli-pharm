import { useNavigate } from 'react-router-dom';
import { useMutation, type UseMutationOptions } from '@tanstack/react-query';

import { useMutationSideEffects } from './useMutationSideEffects';
import type { ApiError, ApiResponse } from '../api';

interface UseEditEntityOptions<
  TVariables,
  TData = ApiResponse<unknown>,
> extends Omit<UseMutationOptions<TData, ApiError, TVariables>, 'mutationFn'> {
  queryKey: string;
  translationKey: string;
  mutationFn: (variables: TVariables) => Promise<TData>;
  redirectTo?: string;
}

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
    ...mutationOptions,
    onSuccess: () => {
      onSuccess();

      if (redirectTo) {
        navigate(redirectTo);
      }
    },
    onError,
  });
}
