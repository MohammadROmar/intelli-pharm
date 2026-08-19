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

export type PlanVisit = {
  id: number;
  pharmacy: PlanPharmacy;
  plan_id: number;
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
  duration_hours: string;
  duration_sec: number;
  distance_km: string;
  distance_m: number;
  geometry: string;
  created_at: string;
};

export type PlanDetail = {
  id: number;
  user_id: number;
  user_name: string;
  region_id: number;
  region_name: string;
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
