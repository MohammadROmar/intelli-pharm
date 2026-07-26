import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Check } from 'lucide-react';

import { cn } from '@/shared/lib';

import type { WizardStepMeta } from '../model/types';

type Props = {
  steps: WizardStepMeta[];
  currentStep: number;
};

export const WizardStepIndicator = memo(function WizardStepIndicator({
  steps,
  currentStep,
}: Props) {
  const { t } = useTranslation('planner');

  return (
    <div className="w-full">
      <p className="text-muted-foreground mb-4 text-center text-sm md:hidden">
        {t('stepProgress', { current: currentStep, total: steps.length })}
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
});
