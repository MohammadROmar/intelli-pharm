import { useTranslation } from 'react-i18next';
import {
  useSuspenseQuery,
  type UseSuspenseQueryOptions,
} from '@tanstack/react-query';

import { createDomainQueryKeys } from './queryKeys';
import { apiClient, type ApiError, type ApiResponse } from '../api';

type SuspenseQueryPassthroughOptions<T> = Omit<
  UseSuspenseQueryOptions<ApiResponse<T>, ApiError>,
  'queryKey' | 'queryFn'
>;

type UseSuspenseGetResourceOptions<T> = SuspenseQueryPassthroughOptions<T> & {
  module?: string;
  queryKey: string;
  params?: Record<string, unknown>;
  withDualLanguage?: boolean;
};

export function useSuspenseGetResource<T>({
  module = 'erp',
  queryKey,
  params,
  withDualLanguage = false,
  ...queryOptions
}: UseSuspenseGetResourceOptions<T>) {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;
  const queryKeys = createDomainQueryKeys(queryKey);

  return useSuspenseQuery<ApiResponse<T>, ApiError>({
    ...queryOptions,
    queryKey: queryKeys.list({ ...params, currentLang, withDualLanguage }),
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
