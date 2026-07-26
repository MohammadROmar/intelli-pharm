import { memo } from 'react';
import type { Dispatch } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';

import { cn } from '@/shared/lib';
import { Button } from '@/shared/ui';

import type { BaseWizardAction } from '../model/types';

type Props = {
  step: number;
  dispatch: Dispatch<BaseWizardAction>;
  totalSteps: number;
  nextLabel?: string;
  canProceed?: boolean;
  isSubmitting?: boolean;
  onSubmit?: () => void;
  onNext?: () => void;
};

export const WizardNavigation = memo(function WizardNavigation({
  step,
  dispatch,
  totalSteps,
  nextLabel,
  canProceed = true,
  isSubmitting = false,
  onSubmit,
  onNext,
}: Props) {
  const { t } = useTranslation('planner');

  const isFirst = step === 1;
  const isLast = step === totalSteps;

  function handleBack() {
    if (isFirst) return;
    dispatch({ type: 'SET_STEP', payload: step - 1 });
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
    dispatch({ type: 'SET_STEP', payload: step + 1 });
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
});
