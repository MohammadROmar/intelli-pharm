import { useSearchParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useSuspenseQuery } from '@tanstack/react-query';

import { createDomainQueryKeys } from './queryKeys';

import { apiClient, type ApiError, type ApiResponse } from '../api';
import {
  getPage,
  getPerPage,
  normalizeApiParams,
  serializeFilters,
  type FilterParams,
} from '../lib';

type Props = {
  module?: string;
  queryKey: string;
  filters?: FilterParams;
  withDualLanguage?: boolean;
  staleTime?: number;
  refetchOnMount?: boolean;
};

export function useSuspenseGetEntities<
  TResponse extends { data?: TItem[] },
  TItem,
>({
  module = 'erp',
  queryKey,
  filters,
  withDualLanguage = false,
  staleTime,
  refetchOnMount,
}: Props) {
  const [searchParams] = useSearchParams();
  const { i18n } = useTranslation();

  const currentLang = i18n.language;
  const page_number = getPage(searchParams);
  const per_page = getPerPage(searchParams);

  const params = normalizeApiParams(filters, page_number, per_page);
  const canonicalFilters = serializeFilters(filters);
  const queryKeys = createDomainQueryKeys(queryKey);

  return useSuspenseQuery<ApiResponse<TResponse>, ApiError>({
    queryKey: queryKeys.list({
      page_number,
      per_page,
      filters: canonicalFilters,
      currentLang,
      withDualLanguage,
    }),

    queryFn: () => {
      const config: Record<string, unknown> = { params };

      if (withDualLanguage) {
        config.headers = {
          'Accept-Language': currentLang === 'ar' ? 'ar,en' : 'en,ar',
        };
      }

      return apiClient.get<TResponse>(`/${module}/v1/${queryKey}`, config);
    },

    ...(staleTime !== undefined && { staleTime }),
    ...(refetchOnMount !== undefined && { refetchOnMount }),
  });
}
