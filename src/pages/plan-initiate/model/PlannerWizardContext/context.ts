import { createContext, type Dispatch } from 'react';

import type { WizardAction, WizardState } from '../plannerWizardTypes';

export type WizardContextValue = {
  state: WizardState;
  dispatch: Dispatch<WizardAction>;
  reset: () => void;
};

export const WizardContext = createContext<WizardContextValue | null>(null);
