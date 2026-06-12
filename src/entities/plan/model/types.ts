import type { PaginatedResponse } from '@/shared/api';

export type PlanReason = 'initiated' | 'replanning';

export type PlanSummary = {
  id: number;
  user_id: number;
  user_name: string;
  total_distance_km: string;
  total_distance_m: number;
  total_duration_sec: number;
  total_duration_hours: string;
  created_at: string;
  reason: PlanReason;
  reason_details: string;
};

export type PlanListApiResponse = PaginatedResponse<PlanSummary>;

export type PlanListParams = {
  page?: number;
  per_page?: number;
  reason?: PlanReason;
  search?: string;
};

export type PlanPharmacy = {
  id: number;
  name: string;
  info: string;
};

export type PlanVisit = {
  id: number;
  pharmacy: PlanPharmacy;
  plan_id: number;
  duration_hours: string;
  duration_sec: number;
  distance_km: string;
  distance_m: number;
  visit_order: number;
  created_at: string;
  visited: 0 | 1;
  useful: 0 | 1;
  notes: string;
  note_type: string;
};

export type PlanPath = {
  id: number;
  plan_id: number;
  from_sequence: number;
  to_sequence: number;
  distance_km: number;
  duration_hours: number;
  geometry: string;
  created_at: string;
};

export type PlanDetail = {
  id: number;
  user_id: number;
  user_name: string;
  total_distance_km: string;
  total_distance_m: number | null;
  total_duration_sec: number | null;
  total_duration_hours: string;
  created_at: string;
  reason: PlanReason;
  reason_details: string;
  visits: PlanVisit[];
  paths: PlanPath[];
};

type BooleanFilter = '1' | '0' | undefined;

export type PlanFilters = {
  user_id?: string;
  date?: string;
  finished?: BooleanFilter;
};
