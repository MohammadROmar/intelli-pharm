import type {
  BaseWizardAction,
  ConfigSlice,
  LocationSlice,
  PlannerProfile,
  TravelMode,
} from '@/features/plan-initiate-wizard';

export type WizardStep = 1 | 2 | 3;
export const TOTAL_STEPS = 3;

export type AssignmentSlice = {
  rep_id: number | null;
};

export type WizardState = {
  step: WizardStep;
  location: LocationSlice;
  config: ConfigSlice;
  assignment: AssignmentSlice;
};

export type WizardAction =
  | BaseWizardAction
  | { type: 'UPDATE_ASSIGNMENT'; payload: Partial<AssignmentSlice> };

export type InitiatePlanFromDeliveriesPayload = {
  current_longitude: number;
  current_latitude: number;
  reason: 'initiated';
  reason_details: string;
  rep_id: number | null;
  profile: PlannerProfile;
  travel_mode: TravelMode;
};

export type StoredDraft = { version: number; state: WizardState };
