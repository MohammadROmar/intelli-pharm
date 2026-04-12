/// <reference lib="webworker" />
import type {
  MedicineMetric,
  MedicineMetricsSummary,
  MetricsWorkerRequest,
  MetricsWorkerResponse,
} from '../model/medicineMetricsTypes';

export function calculateMedicineMetrics(
  data: MedicineMetric[],
): MedicineMetricsSummary {
  if (!data || data.length === 0) {
    return {
      totalOrders: 0,
      avgAcceptanceRate: 0,
      alternativesUsed: 0,
      medicinesCount: 0,
    };
  }

  let totalOrders = 0;
  let totalAcceptanceRate = 0;
  let alternativesUsed = 0;
  const uniqueMedicines = new Set<number>();

  for (const item of data) {
    totalOrders += item.total_orders;
    totalAcceptanceRate += item.alternative_acceptance_rate;
    alternativesUsed += item.alternative_used_count;
    uniqueMedicines.add(item.medicine_id);
  }

  return {
    totalOrders,
    avgAcceptanceRate: totalAcceptanceRate / data.length,
    alternativesUsed,
    medicinesCount: uniqueMedicines.size,
  };
}

self.onmessage = (event: MessageEvent<MetricsWorkerRequest>) => {
  try {
    const { type, payload } = event.data;

    if (type === 'CALCULATE_METRICS') {
      const result = calculateMedicineMetrics(payload);

      self.postMessage({
        type: 'SUCCESS',
        payload: result,
      } satisfies MetricsWorkerResponse);
    }
  } catch (error) {
    self.postMessage({
      type: 'ERROR',
      error: error instanceof Error ? error.message : 'Unknown worker error',
    } satisfies MetricsWorkerResponse);
  }
};
