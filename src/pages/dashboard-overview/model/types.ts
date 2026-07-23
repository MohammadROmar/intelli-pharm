export type DashboardRange = 'today' | '7d' | '30d';

export type DashboardSummary = {
  range: {
    key: DashboardRange;
    label: string;
    from: string;
    to: string;
  };
  kpis: {
    orders_today: { value: number; change_pct: number };
    active_field_staff: { value: number; on_route: number; idle: number };
    pending_deliveries: { value: number; delayed: number };
    near_expiry_medicines: { value: number; window_days: number };
  };
  needs_attention: NeedsAttentionItem[];
  live_tracking_preview: {
    active_count: number;
    representatives: number;
    distributors: number;
  };
  today_plans: {
    total: number;
    in_progress: number;
    completed: number;
  };
};

export type NeedsAttentionType =
  | 'expiring_medicine'
  | 'delivery_delayed'
  | 'visit_failed'
  | (string & {});

export type NeedsAttentionSeverity = 'warning' | 'danger' | (string & {});

export type NeedsAttentionRelatedType =
  | 'medicine'
  | 'delivery'
  | 'pharmacy'
  | (string & {});

export type NeedsAttentionItem = {
  type: NeedsAttentionType;
  severity: NeedsAttentionSeverity;
  message: string;
  related_type: NeedsAttentionRelatedType;
  related_id: number | null;
};

export type OrdersTrendPoint = {
  date: string;
  orders_count: number;
  total_value: number;
};

export type OrdersTrend = OrdersTrendPoint[];

export type DashboardPeriod = 'month' | 'quarter';

export type TargetLeaderboardRow = {
  employee_id: number;
  name: string;
  quota: number;
  actual: number;
  attainment_pct: number;
};

export type TargetLeaderboard = TargetLeaderboardRow[];
