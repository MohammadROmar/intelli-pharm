import { useMutation } from '@tanstack/react-query';

import { useMutationSideEffects } from './useMutationSideEffects';
import { apiClient, type ApiError, type ApiResponse } from '../api';

type Props = { item: string; module?: string; translationKey: string };

export function useDeleteEntity({
  item,
  module = 'erp',
  translationKey,
}: Props) {
  const { onSuccess, onError } = useMutationSideEffects({
    action: 'delete',
    queryKey: item,
    translationKey,
  });

  return useMutation<ApiResponse<unknown>, ApiError, number>({
    mutationFn: (id: number) => apiClient.delete(`/${module}/v1/${item}/${id}`),
    onSuccess,
    onError,
  });
}
