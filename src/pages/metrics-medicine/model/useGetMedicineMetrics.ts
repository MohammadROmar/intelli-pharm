import { useQuery } from '@tanstack/react-query';

import type { MedicineMetric } from './medicineMetricsTypes';
import { apiClient, ApiError, type ApiResponse } from '@/shared/api';

export function useGetMedicineMetrics() {
  return useQuery<ApiResponse<MedicineMetric[]>, ApiError>({
    queryKey: ['metrics-medicine'],
    queryFn: () =>
      apiClient.get<MedicineMetric[]>('/crm/v1/metrics/medicine', {
        params: { medicine_id: 1 },
      }),
  });
}
