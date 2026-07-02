import { PlannerWizardProvider } from './PlannerWizardProvider';
import { toInitiatePlanPayload } from '../lib/utils';
import { useInitiatePlan } from '../model/useInitiatePlan';
import { usePlannerWizard } from '../model/PlannerWizardContext';
import { PlannerWizard } from './PlannerWizard';

function PlannerWizardWithSubmit() {
  const { state, reset } = usePlannerWizard();

  const { mutate, isPending } = useInitiatePlan();

  function handleSubmit() {
    mutate(toInitiatePlanPayload(state), { onSuccess: reset });
  }

  return <PlannerWizard onSubmit={handleSubmit} isPending={isPending} />;
}

export default function InitiatePlanPage() {
  return (
    <PlannerWizardProvider>
      <PlannerWizardWithSubmit />
    </PlannerWizardProvider>
  );
}
