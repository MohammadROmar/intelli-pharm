import type {
  BaseWizardAction,
  ConfigSlice,
  LocationSlice,
  PlannerProfile,
  TravelMode,
} from '@/features/plan-initiate-wizard';

export type WizardStep = 1 | 2 | 3 | 4;
export const TOTAL_STEPS = 4;

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
  | BaseWizardAction
  | { type: 'UPDATE_ASSIGNMENT'; payload: Partial<AssignmentSlice> }
  | { type: 'UPDATE_PHARMACIES'; payload: Partial<PharmaciesSlice> };

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
