import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSuspenseQuery } from '@tanstack/react-query';

import { getSeasonalMetrics } from '@/entities/metrics';
import type { SeasonalFilters, SeasonalMetricsData } from '@/entities/metrics';
import type { ApiError, ApiResponse } from '@/shared/api';
import { createDomainQueryKeys } from '@/shared/model';
import {
  getPage,
  getPerPage,
  normalizeApiParams,
  serializeFilters,
} from '@/shared/lib';

const queryKeys = createDomainQueryKeys('metrics/seasonal');

export function useSeasonalMetrics(filters: SeasonalFilters) {
  const [searchParams] = useSearchParams();
  const { i18n } = useTranslation();

  const page_number = getPage(searchParams);
  const per_page = getPerPage(searchParams);
  const params = normalizeApiParams(filters, page_number, per_page);
  const canonicalFilters = serializeFilters(filters);

  return useSuspenseQuery<ApiResponse<SeasonalMetricsData>, ApiError>({
    queryKey: queryKeys.list({
      page_number,
      per_page,
      filters: canonicalFilters,
      lang: i18n.language,
    }),
    queryFn: () => getSeasonalMetrics(params),
  });
}
