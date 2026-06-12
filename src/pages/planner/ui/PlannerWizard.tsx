import { lazy, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { Check } from 'lucide-react';

import { cn, ErrorBoundary } from '@/shared/lib';
import { Button, PageTitle, SectionErrorFallback, Skeleton } from '@/shared/ui';

import type { WizardStep } from '../model/plannerWizardTypes';
import { usePlannerWizard } from '../model/PlannerWizardContext';

const Step1Location = lazy(() =>
  import('./steps/Step1Location').then((m) => ({ default: m.Step1Location })),
);
const Step2Config = lazy(() =>
  import('./steps/Step2Config').then((m) => ({ default: m.Step2Config })),
);
const Step3Assignment = lazy(() =>
  import('./steps/Step3Assignment').then((m) => ({
    default: m.Step3Assignment,
  })),
);
const Step4Pharmacies = lazy(() =>
  import('./steps/Step4Pharmacies').then((m) => ({
    default: m.Step4Pharmacies,
  })),
);

function StepIndicator({ currentStep }: { currentStep: WizardStep }) {
  const { t } = useTranslation('planner');

  const steps: { step: WizardStep; label: string }[] = [
    { step: 1, label: t('steps.location') },
    { step: 2, label: t('steps.config') },
    { step: 3, label: t('steps.assignment') },
    { step: 4, label: t('steps.pharmacies') },
  ];

  return (
    <div className="w-full">
      <p className="text-muted-foreground mb-4 text-center text-sm md:hidden">
        {t('stepProgress', { current: currentStep, total: 4 })}
      </p>
      <div className="hidden w-full items-center justify-center md:flex">
        {steps.map(({ step, label }, i) => {
          const isDone = currentStep > step;
          const isCurrent = currentStep === step;
          return (
            <div key={step} className="flex flex-1 items-center">
              <div className="flex flex-col items-center gap-1.5">
                <div
                  className={cn(
                    'flex size-8 items-center justify-center rounded-full border-2 text-sm font-semibold transition-all',
                    isDone &&
                      'border-primary bg-primary text-primary-foreground',
                    isCurrent && 'border-primary text-primary',
                    !isDone &&
                      !isCurrent &&
                      'border-muted-foreground/30 text-muted-foreground',
                  )}
                >
                  {isDone ? <Check className="size-4" /> : step}
                </div>
                <span
                  className={cn(
                    'text-xs font-medium',
                    isCurrent ? 'text-foreground' : 'text-muted-foreground',
                  )}
                >
                  {label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div
                  className={cn(
                    'mx-2 h-0.5 flex-1 transition-colors',
                    isDone ? 'bg-primary' : 'bg-muted-foreground/20',
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

type Props = { onSubmit: () => void; isPending?: boolean };

function SkeletonFallback() {
  return (
    <>
      <Skeleton className="h-96 w-full rounded-xl" />
      <div className="flex items-center justify-between">
        <Skeleton className="h-9 w-11" />
        <Skeleton className="h-9 w-19.75" />
      </div>
    </>
  );
}

export function PlannerWizard({ onSubmit, isPending }: Props) {
  const { state, reset } = usePlannerWizard();
  const { t } = useTranslation('planner');

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <PageTitle title={t('pageTitle')} subtitle={t('pageSubtitle')} />
        <Button variant="outline" onClick={reset}>
          {t('reset')}
        </Button>
      </div>

      <StepIndicator currentStep={state.step} />
      <ErrorBoundary FallbackComponent={SectionErrorFallback}>
        <Suspense fallback={<SkeletonFallback />}>
          {state.step === 1 && <Step1Location />}
          {state.step === 2 && <Step2Config />}
          {state.step === 3 && <Step3Assignment />}
          {state.step === 4 && (
            <Step4Pharmacies onSubmit={onSubmit} isPending={isPending} />
          )}
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
