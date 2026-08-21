import { useTranslation } from 'react-i18next';
import { useSuspenseQuery } from '@tanstack/react-query';

import { createDomainQueryKeys } from './queryKeys';

import { apiClient, type ApiError, type ApiResponse } from '../api';

type UseSuspenseGetEntityOptions = {
  id: number;
  queryKey: string;
  endpoint: string;
  withDualLanguage?: boolean;
  staleTime?: number;
  refetchOnMount?: boolean;
};

export function useSuspenseGetEntityById<TData>({
  id,
  queryKey,
  endpoint,
  withDualLanguage = false,
  staleTime,
  refetchOnMount,
}: UseSuspenseGetEntityOptions) {
  const { i18n } = useTranslation();

  const currentLang = i18n.language;
  const queryKeys = createDomainQueryKeys(queryKey);

  return useSuspenseQuery<ApiResponse<TData>, ApiError>({
    queryKey: queryKeys.detail({
      paramName: 'id',
      rawId: String(id),
      currentLang,
      withDualLanguage,
    }),

    queryFn: () => {
      const url = `${endpoint.replace(/\/$/, '')}/${id}`;
      const config: Record<string, unknown> = {};

      if (withDualLanguage) {
        config.headers = {
          'Accept-Language': currentLang === 'ar' ? 'ar,en' : 'en,ar',
        };
      }

      return apiClient.get<TData>(url, config);
    },

    ...(staleTime !== undefined && { staleTime }),
    ...(refetchOnMount !== undefined && { refetchOnMount }),
  });
}
