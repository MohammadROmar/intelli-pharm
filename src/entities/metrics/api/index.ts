import { apiClient } from '@/shared/api';

import type {
  SeasonalMetricsData,
  MedicineMetricsData,
  AreaMetricsData,
  PharmacyMetricsData,
} from '../model/metricsTypes';

export function getSeasonalMetrics(params: Record<string, unknown>) {
  return apiClient.get<SeasonalMetricsData>('/crm/v1/metrics/seasonal', {
    params,
  });
}

export function getMedicineMetrics(params: Record<string, unknown>) {
  return apiClient.get<MedicineMetricsData>('/crm/v1/metrics/medicine', {
    params,
  });
}

export function getAreaMetrics(params: Record<string, unknown>) {
  return apiClient.get<AreaMetricsData>('/crm/v1/metrics/area', { params });
}

export function getPharmacyMetrics(params: Record<string, unknown>) {
  return apiClient.get<PharmacyMetricsData>('/crm/v1/metrics/pharmacy', {
    params,
  });
}
