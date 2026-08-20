import type { PaginatedResponse } from '@/shared/api';

export type PlanReason = 'initiated' | 'replanning';

export type PlanSummary = {
  id: number;
  user_id: number;
  user_name: string;
  total_distance_km: string;
  total_distance_m: number;
  region_id: number;
  region_name: string;
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

export type PlanVisitStatus =
  | 'pending'
  | 'completed'
  | 'skipped'
  | 'failed'
  | 'blocked';

export type PlanVisitNoteType = 'tip' | 'general' | 'warning';

export type PlanRouteMetrics = {
  duration_hours: number;
  duration_sec: string;
  distance_km: number;
  distance_m: string;
};

export type PlanVisit = PlanRouteMetrics & {
  id: number;
  pharmacy: PlanPharmacy;
  plan_id: number;
  visit_order: number;
  started_at: string | null;
  ended_at: string | null;
  service_time_sec: number | null;
  driver_reported_cause: string | null;
  created_at: string;
  visited: 0 | 1;
  useful: 0 | 1;
  notes: string | null;
  note_type: PlanVisitNoteType;
  status: PlanVisitStatus;
};

export type PlanPath = PlanRouteMetrics & {
  id: number;
  plan_id: number;
  from_sequence: number;
  to_sequence: number;
  geometry: string;
  created_at: string;
};

export type PlanDetail = {
  id: number;
  user_id: number;
  user_name: string;
  region_id: number;
  region_name: string;
  total_distance_m: string;
  total_distance_km: number;
  total_duration_sec: string;
  total_duration_hours: number;
  created_at: string;
  finished: boolean;
  deleted_at: string | null;
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

export type PlanGenerationKind = 'rep' | 'delivery';

export type PlanGenerationStatus =
  | 'queued'
  | 'processing'
  | 'completed'
  | 'failed';

export type PlanProfile =
  | 'all_factors'
  | 'balanced'
  | 'fastest'
  | 'cheapest'
  | 'vip_first'
  | 'time_window_first'
  | 'pedestrian_light';

export type PlanTravelMode = 'driving' | 'walking';

export type InitiateRepPlanPayload = {
  current_longitude: number;
  current_latitude: number;
  reason: 'initiated';
  reason_details: string;
  rep_id: number | null;
  region_id: number;
  pharmacy_ids: number[];
  profile: PlanProfile;
  travel_mode: PlanTravelMode;
};

export type InitiateDeliveryPlanPayload = {
  current_longitude: number;
  current_latitude: number;
  reason: 'initiated';
  reason_details: string;
  rep_id: number | null;
  profile: PlanProfile;
  travel_mode: PlanTravelMode;
};

export type PlanGenerationRequest = {
  request_id: string;
  status: PlanGenerationStatus;
  type: PlanGenerationKind;
  user_id: number;
  requested_by: number;
  plan_id: number | null;
  channel: string;
  ready_event: string;
  failed_event: string;
  error_message: string | null;
  created_at: string;
  started_at: string | null;
  finished_at: string | null;
  plan?: PlanDetail | null;
};

export type PlanReadyEventPayload = {
  request_id: string;
  status: 'completed';
  type: PlanGenerationKind;
  plan_id: number;
  plan: PlanDetail;
};

export type PlanFailedEventPayload = {
  request_id: string;
  status: 'failed';
  type: PlanGenerationKind;
  message: string;
};
