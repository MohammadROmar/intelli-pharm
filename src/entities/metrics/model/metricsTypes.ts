export type MetricsSeason = {
  quarter: string;
  year: number;
};

export type MetricsPaginatedWrapper<T> = {
  current_page: number;
  data: T[];
  last_page: number;
  per_page: number;
  from: number;
  to: number;
  total: number;
};

export type SeasonalMetric = {
  id: number;
  pharmacy_id: number;
  pharmacy_name: string;
  category_id: number;
  category_name: string;
  quarter: string;
  year: number;
  order_count: number;
  total_units: number;
  total_revenue: number;
  avg_order_value: number;
  computed_at: string;
  created_at: string;
  updated_at: string;
};

export type SeasonalSummary = {
  order_count: number;
  total_units: number;
  total_revenue: number;
  avg_order_value: number;
};

export type SeasonalMetricsData = {
  season: MetricsSeason;
  metrics: MetricsPaginatedWrapper<SeasonalMetric>;
  summary: SeasonalSummary;
};

export type SeasonalFilters = {
  quarter?: string;
  year?: string;
  pharmacy_id?: number;
  category_id?: number;
};

export type MedicineMetric = {
  id: number;
  medicine_id: number;
  medicine_name: string;
  quarter: string;
  year: number;
  total_orders: number;
  alternative_used_count: number;
  alternative_acceptance_rate: number;
  created_at: string;
  updated_at: string;
};

export type MedicineSummary = {
  total_orders: number;
  avg_acceptance_rate: number;
  alternatives_used_count: number;
};

export type MedicineMetricsData = {
  season: MetricsSeason;
  metrics: MetricsPaginatedWrapper<MedicineMetric>;
  summary: MedicineSummary;
};

export type MedicineFilters = {
  quarter?: string;
  year?: number;
  medicine_id?: number;
};

export type AreaMetric = {
  id: number;
  region_id: number;
  region_name: string;
  category_id: number;
  category_name: string;
  quarter: string;
  year: number;
  total_orders: number;
  total_completed_orders: number;
  total_cancelled_orders: number;
  total_units_sold: number;
  created_at: string;
  updated_at: string;
};

export type AreaSummary = {
  total_orders: number;
  total_completed_orders: number;
  total_cancelled_orders: number;
  total_units_sold: number;
};

export type AreaMetricsData = {
  season: MetricsSeason;
  metrics: MetricsPaginatedWrapper<AreaMetric>;
  summary: AreaSummary;
};

export type AreaFilters = {
  quarter?: string;
  year?: number;
  region_id?: number;
  category_id?: number;
};

export type PharmacyTier = 'Gold' | 'Silver' | 'Bronze';

export type PharmacyMetric = {
  id: number;
  pharmacy_id: number;
  pharmacy_name: string;
  score: number;
  tier: PharmacyTier;
  total_orders: number;
  completed_orders: number;
  completion_rate: number;
  avg_items_per_order: number;
  total_items: number;
  last_order_at: string;
  recency_score: number;
  calculated_at: string;
  created_at: string;
  updated_at: string;
};

export type PharmacySummary = {
  total_orders: number;
  total_completed_orders: number;
  total_items: number;
  avg_completion_rate: number;
  avg_items_per_order: number;
  avg_score: number;
  avg_recency_score: number;
};

export type PharmacyMetricsData = {
  metrics: PharmacyMetric[];
  summary: PharmacySummary;
};

export type PharmacyFilters = {
  pharmacy_id?: number;
};
