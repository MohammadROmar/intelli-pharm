import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

import type { ApiError, ApiResponse } from '../api';

type UseGetEntityOptions<TData> = {
  queryKey: string;
  fetchFn: (id: number) => Promise<ApiResponse<TData>>;
  paramName?: string;
} & Omit<UseQueryOptions<ApiResponse<TData>, ApiError>, 'queryKey' | 'queryFn'>;

export function useGetEntityById<TData>({
  queryKey,
  fetchFn,
  paramName = 'id',
  enabled = true,
  ...queryOptions
}: UseGetEntityOptions<TData>) {
  const { i18n } = useTranslation();

  const params = useParams();
  const rawId = params[paramName];

  const numericId = Number(rawId);
  const isValidId = rawId !== undefined && !isNaN(numericId);

  return useQuery<ApiResponse<TData>, ApiError>({
    queryKey: [queryKey, `${paramName}-${rawId}`, i18n.language],
    queryFn: () => fetchFn(numericId),
    enabled: isValidId && enabled,
    ...queryOptions,
  });
}
