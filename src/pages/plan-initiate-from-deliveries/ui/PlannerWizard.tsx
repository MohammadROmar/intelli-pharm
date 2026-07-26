import { lazy, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import {
  WizardShell,
  type WizardStepMeta,
} from '@/features/plan-initiate-wizard';

import { TOTAL_STEPS } from '../model/plannerWizardTypes';
import { useDeliveryPlanWizard } from '../model/PlannerWizardContext';

const LocationStep = lazy(() =>
  import('@/features/plan-initiate-wizard').then((m) => ({
    default: m.LocationStep,
  })),
);
const ConfigStep = lazy(() =>
  import('@/features/plan-initiate-wizard').then((m) => ({
    default: m.ConfigStep,
  })),
);
const Step3Assignment = lazy(() =>
  import('./steps/Step3Assignment').then((m) => ({
    default: m.Step3Assignment,
  })),
);

type Props = { onSubmit: () => void; isPending?: boolean };

export function PlannerWizard({ onSubmit, isPending }: Props) {
  const { t } = useTranslation('planner');
  const { state, dispatch, reset } = useDeliveryPlanWizard();

  const steps: WizardStepMeta[] = useMemo(
    () => [
      { step: 1, label: t('steps.location') },
      { step: 2, label: t('steps.config') },
      { step: 3, label: t('steps.assignment') },
    ],
    [t],
  );

  return (
    <WizardShell
      title={t('fromDeliveries.pageTitle')}
      subtitle={t('fromDeliveries.pageSubtitle')}
      resetLabel={t('reset')}
      onReset={reset}
      steps={steps}
      currentStep={state.step}
    >
      {state.step === 1 && (
        <LocationStep
          state={state}
          dispatch={dispatch}
          totalSteps={TOTAL_STEPS}
        />
      )}
      {state.step === 2 && (
        <ConfigStep
          state={state}
          dispatch={dispatch}
          totalSteps={TOTAL_STEPS}
        />
      )}
      {state.step === 3 && (
        <Step3Assignment onSubmit={onSubmit} isPending={isPending} />
      )}
    </WizardShell>
  );
}
