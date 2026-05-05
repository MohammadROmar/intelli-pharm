import { useParams } from 'react-router-dom';
import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import { apiClient, type ApiError, type ApiResponse } from '../api';

type UseGetEntityOptions<TData> = {
  queryKey: string;
  endpoint: string;
  paramName?: string;
  withDualLanguage?: boolean;
} & Omit<UseQueryOptions<ApiResponse<TData>, ApiError>, 'queryKey' | 'queryFn'>;

export function useGetEntityById<TData>({
  queryKey,
  endpoint,
  paramName = 'id',
  enabled = true,
  withDualLanguage = false,
  ...queryOptions
}: UseGetEntityOptions<TData>) {
  const params = useParams();
  const { i18n } = useTranslation();

  const rawId = params[paramName];
  const currentLang = i18n.language;

  const numericId = Number(rawId);
  const isValidId = rawId !== undefined && !isNaN(numericId);

  return useQuery<ApiResponse<TData>, ApiError>({
    queryKey: [
      queryKey,
      `${paramName}-${rawId}`,
      currentLang,
      withDualLanguage,
    ],
    enabled: isValidId && enabled,

    queryFn: async () => {
      const url = `${endpoint.replace(/\/$/, '')}/${numericId}`;
      const config: Record<string, unknown> = {};

      if (withDualLanguage) {
        config.headers = {
          'Accept-Language': currentLang === 'ar' ? 'ar,en' : 'en,ar',
        };
      }

      return apiClient.get<TData>(url, config);
    },

    ...queryOptions,
  });
}
