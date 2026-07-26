import { useCallback } from 'react';

import { useLatestRef } from '@/shared/lib';

import { PlannerWizard } from './PlannerWizard';
import { PlannerWizardProvider } from './PlannerWizardProvider';
import { toInitiatePlanFromDeliveriesPayload } from '../lib/utils';
import { useDeliveryPlanWizard } from '../model/PlannerWizardContext';
import { useInitiatePlanFromDeliveries } from '../model/useInitiatePlanFromDeliveries';

function PlannerWizardWithSubmit() {
  const { state, reset } = useDeliveryPlanWizard();
  const { mutate, isPending } = useInitiatePlanFromDeliveries();

  const stateRef = useLatestRef(state);

  const handleSubmit = useCallback(() => {
    mutate(toInitiatePlanFromDeliveriesPayload(stateRef.current), {
      onSuccess: reset,
    });
  }, [mutate, reset, stateRef]);

  return <PlannerWizard onSubmit={handleSubmit} isPending={isPending} />;
}

export default function InitiatePlanFromDeliveriesPage() {
  return (
    <PlannerWizardProvider>
      <PlannerWizardWithSubmit />
    </PlannerWizardProvider>
  );
}
