import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

import type { PharmacyMetrics } from './pharmacyMetricsTypes';
import { apiClient, ApiError, type ApiResponse } from '@/shared/api';

export function useGetPharmacyMetrics() {
  const [searchParams] = useSearchParams();

  const pharmacy_id = searchParams.get('pharmacy_id');

  return useQuery<ApiResponse<PharmacyMetrics[]>, ApiError>({
    queryKey: ['metrics-pharmacy', pharmacy_id],
    queryFn: () =>
      apiClient.get<PharmacyMetrics[]>('/crm/v1/metrics/pharmacy', {
        params: { pharmacy_id },
      }),
  });
}
