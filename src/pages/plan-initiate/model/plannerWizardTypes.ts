export type WizardStep = 1 | 2 | 3 | 4;

export type PlannerProfile =
  | 'all_factors'
  | 'balanced'
  | 'fastest'
  | 'cheapest'
  | 'vip_first'
  | 'time_window_first'
  | 'pedestrian_light';

export type TravelMode = 'driving' | 'walking';

export type LocationSlice = {
  current_latitude: number | null;
  current_longitude: number | null;
};

export type ConfigSlice = {
  profile: PlannerProfile;
  travel_mode: TravelMode;
  reason_details: string;
};

export type AssignmentSlice = {
  rep_id: number | null;
  region_id: number | null;
};

export type PharmaciesSlice = {
  pharmacy_ids: number[];
};

export type WizardState = {
  step: WizardStep;
  location: LocationSlice;
  config: ConfigSlice;
  assignment: AssignmentSlice;
  pharmacies: PharmaciesSlice;
};

export type WizardAction =
  | { type: 'SET_STEP'; payload: WizardStep }
  | { type: 'UPDATE_LOCATION'; payload: Partial<LocationSlice> }
  | { type: 'UPDATE_CONFIG'; payload: Partial<ConfigSlice> }
  | { type: 'UPDATE_ASSIGNMENT'; payload: Partial<AssignmentSlice> }
  | { type: 'UPDATE_PHARMACIES'; payload: Partial<PharmaciesSlice> }
  | { type: 'RESET' };

export type InitiatePlanPayload = {
  current_longitude: number;
  current_latitude: number;
  reason: 'initiated';
  reason_details: string;
  rep_id: number | null;
  region_id: number;
  pharmacy_ids: number[];
  profile: PlannerProfile;
  travel_mode: TravelMode;
};

export type StoredDraft = { version: number; state: WizardState };
