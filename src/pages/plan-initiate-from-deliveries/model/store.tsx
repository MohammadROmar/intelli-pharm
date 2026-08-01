import { createWizardStore } from '@/features/plan-initiate-wizard';

import { WIZARD_INITIAL_STATE, wizardReducer } from '../lib/utils';
import type { WizardAction, WizardState } from './plannerWizardTypes';

export const {
  WizardProvider: PlannerWizardProvider,
  useWizard: useDeliveryPlanWizard,
  useWizardActions: useDeliveryPlanWizardActions,
} = createWizardStore<WizardState, WizardAction>({
  reducer: wizardReducer,
  initialState: WIZARD_INITIAL_STATE,
  draftStorageKey: 'plan_initiate_from_deliveries_wizard_draft',
  draftStorageVersion: 1,
  missingProviderMessage:
    'useDeliveryPlanWizard must be used inside PlannerWizardProvider',
});
