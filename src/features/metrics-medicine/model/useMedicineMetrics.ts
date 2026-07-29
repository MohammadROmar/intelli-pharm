import { useSearchParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useSuspenseQuery } from '@tanstack/react-query';

import { createDomainQueryKeys } from '@/shared/model';
import type { ApiError, ApiResponse } from '@/shared/api';
import {
  getPage,
  getPerPage,
  normalizeApiParams,
  serializeFilters,
} from '@/shared/lib';

import { getMedicineMetrics } from '@/entities/metrics';
import type { MedicineFilters, MedicineMetricsData } from '@/entities/metrics';

const queryKeys = createDomainQueryKeys('metrics/medicine');

export function useMedicineMetrics(filters: MedicineFilters) {
  const [searchParams] = useSearchParams();
  const { i18n } = useTranslation();

  const page_number = getPage(searchParams);
  const per_page = getPerPage(searchParams);
  const params = normalizeApiParams(filters, page_number, per_page);
  const canonicalFilters = serializeFilters(filters);

  return useSuspenseQuery<ApiResponse<MedicineMetricsData>, ApiError>({
    queryKey: queryKeys.list({
      page_number,
      per_page,
      filters: canonicalFilters,
      lang: i18n.language,
    }),
    queryFn: () => getMedicineMetrics(params),
  });
}
