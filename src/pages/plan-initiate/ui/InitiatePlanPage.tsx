import { useCallback } from 'react';

import { useLatestRef } from '@/shared/lib';

import { PlannerWizard } from './PlannerWizard';
import { PlannerWizardProvider } from './PlannerWizardProvider';
import { toInitiatePlanPayload } from '../lib/utils';
import { useInitiatePlan } from '../model/useInitiatePlan';
import { usePlannerWizard } from '../model/PlannerWizardContext';

function PlannerWizardWithSubmit() {
  const { state, reset } = usePlannerWizard();

  const { mutate, isPending } = useInitiatePlan();

  const stateRef = useLatestRef(state);

  const handleSubmit = useCallback(() => {
    mutate(toInitiatePlanPayload(stateRef.current), { onSuccess: reset });
  }, [mutate, reset, stateRef]);

  return <PlannerWizard onSubmit={handleSubmit} isPending={isPending} />;
}

export default function InitiatePlanPage() {
  return (
    <PlannerWizardProvider>
      <PlannerWizardWithSubmit />
    </PlannerWizardProvider>
  );
}
