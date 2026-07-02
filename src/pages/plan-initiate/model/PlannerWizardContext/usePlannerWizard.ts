import { useContext } from 'react';

import { WizardContext } from './context';

export function usePlannerWizard() {
  const ctx = useContext(WizardContext);
  if (!ctx)
    throw new Error(
      'usePlannerWizard must be used inside PlannerWizardProvider',
    );
  return ctx;
}
