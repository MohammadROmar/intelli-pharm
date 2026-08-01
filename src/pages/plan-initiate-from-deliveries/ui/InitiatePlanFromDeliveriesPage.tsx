import { useCallback } from 'react';

import { PlannerWizard } from './PlannerWizard';
import { toInitiatePlanFromDeliveriesPayload } from '../lib/utils';
import {
  PlannerWizardProvider,
  useDeliveryPlanWizardActions,
} from '../model/store';
import { useInitiatePlanFromDeliveries } from '../model/useInitiatePlanFromDeliveries';

function PlannerWizardWithSubmit() {
  const { getState, reset } = useDeliveryPlanWizardActions();
  const { mutate, isPending } = useInitiatePlanFromDeliveries();

  const handleSubmit = useCallback(() => {
    mutate(toInitiatePlanFromDeliveriesPayload(getState()), {
      onSuccess: reset,
    });
  }, [mutate, reset, getState]);

  return <PlannerWizard onSubmit={handleSubmit} isPending={isPending} />;
}

export default function InitiatePlanFromDeliveriesPage() {
  return (
    <PlannerWizardProvider>
      <PlannerWizardWithSubmit />
    </PlannerWizardProvider>
  );
}
