import type { Quarter } from '@/entities/metrics';

export type MedicineMetric = {
  id: number;
  medicine_id: number;
  total_orders: number;
  alternative_acceptance_rate: number;
  alternative_used_count: number;
  quarter: Quarter;
  year: number;
  created_at: string;
  updated_at: string;
};

export type MedicineMetricsFilters = {
  medicine_id?: string | null;
  quarter?: string | null;
  year?: string | null;
};

export type MedicineMetricsSummary = {
  totalOrders: number;
  avgAcceptanceRate: number;
  alternativesUsed: number;
  medicinesCount: number;
};

export type MetricsWorkerRequest = {
  type: 'CALCULATE_METRICS';
  payload: MedicineMetric[];
};

export type MetricsWorkerResponse =
  | { type: 'SUCCESS'; payload: MedicineMetricsSummary }
  | { type: 'ERROR'; error: string };
