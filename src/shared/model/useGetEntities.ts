import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';

import { apiClient, type ApiError, type ApiResponse } from '@/shared/api';
import { getPage, getPerPage } from '@/shared/lib';

type Props = {
  module?: string;
  queryKey: string;
  filters?: Record<string, string | null | undefined>;
  withDualLanguage?: boolean;
};

export function useGetEntities<T extends { data?: Y[] }, Y>({
  module = 'erp',
  queryKey,
  filters,
  withDualLanguage = false,
}: Props) {
  const [searchParams] = useSearchParams();
  const { i18n } = useTranslation();

  const currentLang = i18n.language;
  const page_number = getPage(searchParams);
  const per_page = getPerPage(searchParams);

  const params = { ...filters, page_number, per_page };

  return useQuery<ApiResponse<T>, ApiError>({
    queryKey: [
      queryKey,
      { page_number, per_page, filters },
      currentLang,
      withDualLanguage,
    ],

    queryFn: () => {
      const config: Record<string, unknown> = { params };

      if (withDualLanguage) {
        config.headers = {
          'Accept-Language': currentLang === 'ar' ? 'ar,en' : 'en,ar',
        };
      }

      return apiClient.get(`/${module}/v1/${queryKey}`, config);
    },

    placeholderData: (prev) => {
      const data = prev?.data?.data;
      return data && data.length > 0 ? prev : undefined;
    },
  });
}
