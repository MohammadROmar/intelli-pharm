import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSuspenseQuery } from '@tanstack/react-query';

import { getAreaMetrics } from '@/entities/metrics';
import type { AreaFilters, AreaMetricsData } from '@/entities/metrics';
import { type ApiError, type ApiResponse } from '@/shared/api';
import { createDomainQueryKeys } from '@/shared/model';
import {
  getPage,
  getPerPage,
  normalizeApiParams,
  canonicalizeFilters,
} from '@/shared/lib';

const queryKeys = createDomainQueryKeys('metrics/area');

export function useAreaMetrics(filters: AreaFilters) {
  const [searchParams] = useSearchParams();
  const { i18n } = useTranslation();

  const page_number = getPage(searchParams);
  const per_page = getPerPage(searchParams);
  const params = normalizeApiParams(filters, page_number, per_page);
  const canonicalFilters = canonicalizeFilters(filters);

  return useSuspenseQuery<ApiResponse<AreaMetricsData>, ApiError>({
    queryKey: queryKeys.list({
      page_number,
      per_page,
      filters: canonicalFilters,
      lang: i18n.language,
    }),
    queryFn: () => getAreaMetrics(params),
  });
}
