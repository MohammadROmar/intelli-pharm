import { createWizardStore } from '@/features/plan-initiate-wizard';

import { WIZARD_INITIAL_STATE, wizardReducer } from '../lib/utils';
import type { WizardAction, WizardState } from './plannerWizardTypes';

export const {
  WizardProvider: PlannerWizardProvider,
  useWizard: usePlannerWizard,
  useWizardActions: usePlannerWizardActions,
} = createWizardStore<WizardState, WizardAction>({
  reducer: wizardReducer,
  initialState: WIZARD_INITIAL_STATE,
  draftStorageKey: 'planner_wizard_draft',
  draftStorageVersion: 1,
  missingProviderMessage:
    'usePlannerWizard must be used inside PlannerWizardProvider',
});
