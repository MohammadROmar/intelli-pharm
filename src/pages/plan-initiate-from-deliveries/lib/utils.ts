import type {
  InitiatePlanFromDeliveriesPayload,
  WizardAction,
  WizardState,
  WizardStep,
} from '../model/plannerWizardTypes';

export function toInitiatePlanFromDeliveriesPayload(
  state: WizardState,
): InitiatePlanFromDeliveriesPayload {
  return {
    current_longitude: state.location.current_longitude!,
    current_latitude: state.location.current_latitude!,
    reason: 'initiated',
    reason_details: state.config.reason_details.trim(),
    rep_id: state.assignment.rep_id,
    profile: state.config.profile,
    travel_mode: state.config.travel_mode,
  };
}

export const WIZARD_INITIAL_STATE: WizardState = {
  step: 1,
  location: { current_latitude: null, current_longitude: null },
  config: { profile: 'vip_first', travel_mode: 'driving', reason_details: '' },
  assignment: { rep_id: null },
};

export function wizardReducer(
  state: WizardState,
  action: WizardAction,
): WizardState {
  switch (action.type) {
    case 'SET_STEP':
      return { ...state, step: action.payload as WizardStep };
    case 'UPDATE_LOCATION':
      return { ...state, location: { ...state.location, ...action.payload } };
    case 'UPDATE_CONFIG':
      return { ...state, config: { ...state.config, ...action.payload } };
    case 'UPDATE_ASSIGNMENT':
      return {
        ...state,
        assignment: { ...state.assignment, ...action.payload },
      };
    case 'RESET':
      return WIZARD_INITIAL_STATE;
    default:
      return state;
  }
}
