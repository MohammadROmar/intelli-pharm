import { useTranslation } from 'react-i18next';
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';

import { cn } from '@/shared/lib';
import { Button } from '@/shared/ui';

import type { WizardStep } from '../model/plannerWizardTypes';
import { usePlannerWizard } from '../model/PlannerWizardContext';

type Props = {
  nextLabel?: string;
  canProceed?: boolean;
  isSubmitting?: boolean;
  onSubmit?: () => void;
  onNext?: () => void;
};

const TOTAL_STEPS = 4;

export function WizardNavigation({
  nextLabel,
  canProceed = true,
  isSubmitting = false,
  onSubmit,
  onNext,
}: Props) {
  const { t } = useTranslation('planner');
  const { state, dispatch } = usePlannerWizard();
  const { step } = state;

  const isFirst = step === 1;
  const isLast = step === TOTAL_STEPS;

  function handleBack() {
    if (isFirst) return;
    dispatch({ type: 'SET_STEP', payload: (step - 1) as WizardStep });
  }

  function handleNext() {
    if (isLast) {
      onSubmit?.();
      return;
    }
    if (onNext) {
      onNext();
      return;
    }
    dispatch({ type: 'SET_STEP', payload: (step + 1) as WizardStep });
  }

  return (
    <div
      className={cn(
        'flex items-center justify-between pt-2',
        isFirst && 'justify-end',
      )}
    >
      {!isFirst && (
        <Button
          type="button"
          variant="ghost"
          onClick={handleBack}
          disabled={isFirst || isSubmitting}
          className="gap-2"
        >
          <ArrowLeft className="size-4 rtl:rotate-180" />
          {t('nav.back')}
        </Button>
      )}
      <Button
        type="button"
        onClick={handleNext}
        disabled={!canProceed || isSubmitting}
        className={cn('gap-2', isSubmitting && 'button-shimmer')}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            {t('nav.generating')}
          </>
        ) : (
          <>
            {nextLabel ?? (isLast ? t('nav.submit') : t('nav.next'))}
            {!isLast && <ArrowRight className="size-4 rtl:rotate-180" />}
          </>
        )}
      </Button>
    </div>
  );
}
