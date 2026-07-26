import type { Dispatch } from 'react';

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

export type BaseWizardState = {
  step: number;
  location: LocationSlice;
  config: ConfigSlice;
};

export type BaseWizardAction =
  | { type: 'SET_STEP'; payload: number }
  | { type: 'UPDATE_LOCATION'; payload: Partial<LocationSlice> }
  | { type: 'UPDATE_CONFIG'; payload: Partial<ConfigSlice> }
  | { type: 'RESET' };

export type WizardStepMeta = {
  step: number;
  label: string;
};

export type WizardStepProps = {
  state: BaseWizardState;
  dispatch: Dispatch<BaseWizardAction>;
  totalSteps: number;
};
