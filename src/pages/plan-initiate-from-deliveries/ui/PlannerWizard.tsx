import { lazy, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import {
  LazyConfigStep as ConfigStep,
  LazyLocationStep as LocationStep,
  WizardShell,
  preloadConfigStep,
  type WizardStepMeta,
} from '@/features/plan-initiate-wizard';

import { TOTAL_STEPS } from '../model/plannerWizardTypes';
import { useDeliveryPlanWizard } from '../model/store';

// Named instead of inlined into `lazy()` so the same loader can be called
// directly to prefetch — see the effect below.
const loadStep3Assignment = () =>
  import('./steps/Step3Assignment').then((m) => ({
    default: m.Step3Assignment,
  }));

const Step3Assignment = lazy(loadStep3Assignment);

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

  // Warm the next step's chunk while the user is still on the current one
  // — by the time they advance, `lazy()` below resolves from cache instead
  // of suspending on a fresh network fetch. Keyed on `state.step` (not tied
  // to the "Next" click) so this also covers landing directly on a later
  // step from a restored draft.
  useEffect(() => {
    switch (state.step) {
      case 1:
        void preloadConfigStep();
        break;
      case 2:
        void loadStep3Assignment();
        break;
    }
  }, [state.step]);

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
