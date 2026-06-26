import { useMutation, type UseMutationOptions } from '@tanstack/react-query';

import { useMutationSideEffects } from './useMutationSideEffects';
import type { ApiError, ApiResponse } from '../api';

type UseCreateEntityOptions<TVariables, TData = ApiResponse<unknown>> = {
  queryKey: string;
  translationKey: string;
  mutationFn: (variables: TVariables) => Promise<TData>;
  navigatePath?: string;
} & Omit<UseMutationOptions<TData, ApiError, TVariables>, 'mutationFn'>;

export function useCreateEntity<TVariables, TData = ApiResponse<unknown>>({
  queryKey,
  mutationFn,
  translationKey,
  navigatePath,
  ...mutationOptions
}: UseCreateEntityOptions<TVariables, TData>) {
  const { onSuccess, onError } = useMutationSideEffects({
    action: 'create',
    queryKey,
    translationKey,
    navigatePath,
  });

  return useMutation<TData, ApiError, TVariables>({
    mutationFn,
    onSuccess,
    onError,
    ...mutationOptions,
  });
}
