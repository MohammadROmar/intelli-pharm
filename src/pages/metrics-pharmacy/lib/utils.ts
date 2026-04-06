import type { PharmacyMetrics } from '../model/pharmacyMetricsTypes';

export interface AggregatedMetrics {
  averageScore: number;
  completionRate: number;
  totalOrders: number;
  completedOrders: number;
  totalItems: number;
  totalPharmacies: number;
}

export function calculatePharmacyMetrics(
  data: PharmacyMetrics[],
): AggregatedMetrics {
  if (!data || data.length === 0) {
    return {
      averageScore: 0,
      completionRate: 0,
      totalOrders: 0,
      completedOrders: 0,
      totalItems: 0,
      totalPharmacies: 0,
    };
  }

  let totalScore: number = 0;
  let totalOrders: number = 0;
  let completedOrders: number = 0;
  let totalItems: number = 0;

  const uniquePharmacies = new Set<number>();

  data.forEach((item: PharmacyMetrics) => {
    totalScore += parseFloat(item.score || '0');
    totalOrders += item.total_orders || 0;
    completedOrders += item.completed_orders || 0;
    totalItems += item.total_items || 0;

    uniquePharmacies.add(item.pharmacy_id);
  });

  const totalPharmacies: number = uniquePharmacies.size;

  const averageScore: number = totalScore / data.length;

  const completionRate: number =
    totalOrders > 0 ? completedOrders / totalOrders : 0;

  return {
    averageScore: Number(averageScore.toFixed(2)),
    completionRate: Number(completionRate.toFixed(4)),
    totalOrders: totalOrders,
    completedOrders: completedOrders,
    totalItems: totalItems,
    totalPharmacies: totalPharmacies,
  };
}
