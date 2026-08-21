export type MetricsSeason = { quarter: string; year: number };

export type Pagination = {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
};

export type MetricsData<TMetric, TSummary> = {
  metrics: TMetric[];
  pagination: Pagination;
  summary: TSummary;
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

export type SeasonalMetricsData = MetricsData<
  SeasonalMetric,
  SeasonalSummary
> & {
  season: MetricsSeason;
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
  year: string;
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

export type MedicineMetricsData = MetricsData<
  MedicineMetric,
  MedicineSummary
> & {
  season: MetricsSeason;
};

export type MedicineFilters = {
  quarter?: string;
  year?: string;
  medicine_id?: number;
};

export type AreaMetric = {
  id: number;
  region_id: number;
  region_name: string;
  category_id: number;
  category_name: string;
  quarter: string;
  year: string;
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

export type AreaMetricsData = MetricsData<AreaMetric, AreaSummary> & {
  season: MetricsSeason;
};

export type AreaFilters = {
  quarter?: string;
  year?: string;
  region_id?: number;
  category_id?: number;
};

export type PharmacyTier = 'Platinum' | 'Gold' | 'Silver' | 'Bronze';

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

export type PharmacyMetricsData = MetricsData<PharmacyMetric, PharmacySummary>;

export type PharmacyFilters = {
  pharmacy_id?: string;
};
