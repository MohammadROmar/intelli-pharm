import { useCallback } from 'react';

import { PlannerWizard } from './PlannerWizard';
import { toInitiatePlanPayload } from '../lib/utils';
import { useInitiatePlan } from '../model/useInitiatePlan';
import { PlannerWizardProvider, usePlannerWizardActions } from '../model/store';

function PlannerWizardWithSubmit() {
  const { getState, reset } = usePlannerWizardActions();

  const { mutate, isPending } = useInitiatePlan();

  const handleSubmit = useCallback(() => {
    mutate(toInitiatePlanPayload(getState()), { onSuccess: reset });
  }, [mutate, reset, getState]);

  return <PlannerWizard onSubmit={handleSubmit} isPending={isPending} />;
}

export default function InitiatePlanPage() {
  return (
    <PlannerWizardProvider>
      <PlannerWizardWithSubmit />
    </PlannerWizardProvider>
  );
}
