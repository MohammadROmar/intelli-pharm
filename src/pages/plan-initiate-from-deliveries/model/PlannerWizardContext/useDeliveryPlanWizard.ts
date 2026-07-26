import { useContext } from 'react';

import { WizardContext } from './context';

export function useDeliveryPlanWizard() {
  const ctx = useContext(WizardContext);
  if (!ctx)
    throw new Error(
      'useDeliveryPlanWizard must be used inside PlannerWizardProvider',
    );
  return ctx;
}
