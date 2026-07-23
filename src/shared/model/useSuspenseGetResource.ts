import { useTranslation } from 'react-i18next';
import { useSuspenseQuery } from '@tanstack/react-query';

import { createDomainQueryKeys } from './queryKeys';
import { apiClient, type ApiError, type ApiResponse } from '../api';

type UseSuspenseGetResourceOptions = {
  module?: string;
  queryKey: string;
  params?: Record<string, unknown>;
  withDualLanguage?: boolean;
  staleTime?: number;
};

export function useSuspenseGetResource<T>({
  module = 'erp',
  queryKey,
  params,
  withDualLanguage = false,
  staleTime,
}: UseSuspenseGetResourceOptions) {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;
  const queryKeys = createDomainQueryKeys(queryKey);

  return useSuspenseQuery<ApiResponse<T>, ApiError>({
    queryKey: queryKeys.list({ ...params, currentLang, withDualLanguage }),
    staleTime,

    queryFn: () => {
      const config: Record<string, unknown> = { params };

      if (withDualLanguage) {
        config.headers = {
          'Accept-Language': currentLang === 'ar' ? 'ar,en' : 'en,ar',
        };
      }

      return apiClient.get<T>(`/${module}/v1/${queryKey}`, config);
    },
  });
}
