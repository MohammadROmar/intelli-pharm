import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSuspenseQuery } from '@tanstack/react-query';

import type { ApiError, ApiResponse } from '@/shared/api';
import { createDomainQueryKeys } from '@/shared/model';
import {
  getPage,
  getPerPage,
  normalizeApiParams,
  serializeFilters,
} from '@/shared/lib';

import { getPharmacyMetrics } from '@/entities/metrics';
import type { PharmacyFilters, PharmacyMetricsData } from '@/entities/metrics';

const queryKeys = createDomainQueryKeys('metrics/pharmacy');

export function usePharmacyMetrics(filters: PharmacyFilters) {
  const [searchParams] = useSearchParams();
  const { i18n } = useTranslation();

  const page_number = getPage(searchParams);
  const per_page = getPerPage(searchParams);
  const params = normalizeApiParams(filters, page_number, per_page);
  const canonicalFilters = serializeFilters(filters);

  return useSuspenseQuery<ApiResponse<PharmacyMetricsData>, ApiError>({
    queryKey: queryKeys.list({
      filters: canonicalFilters,
      lang: i18n.language,
    }),
    queryFn: () => getPharmacyMetrics(params),
  });
}
