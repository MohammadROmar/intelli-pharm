import { Suspense } from 'react';
import type { ReactNode } from 'react';

import { ErrorBoundary } from '@/shared/lib';
import { Button, PageTitle, SectionErrorFallback, Skeleton } from '@/shared/ui';

import { WizardStepIndicator } from './WizardStepIndicator';
import type { WizardStepMeta } from '../model/types';

const wizardStepSkeleton = (
  <>
    <Skeleton className="h-96 w-full rounded-xl" />
    <div className="flex items-center justify-between">
      <Skeleton className="h-9 w-11" />
      <Skeleton className="h-9 w-19.75" />
    </div>
  </>
);

type Props = {
  title: string;
  subtitle: string;
  resetLabel: string;
  onReset: () => void;
  steps: WizardStepMeta[];
  currentStep: number;
  children: ReactNode;
};

export function WizardShell({
  title,
  subtitle,
  resetLabel,
  onReset,
  steps,
  currentStep,
  children,
}: Props) {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <PageTitle title={title} subtitle={subtitle} />
        <Button variant="outline" onClick={onReset}>
          {resetLabel}
        </Button>
      </div>

      <WizardStepIndicator steps={steps} currentStep={currentStep} />

      <ErrorBoundary FallbackComponent={SectionErrorFallback}>
        <Suspense fallback={wizardStepSkeleton}>{children}</Suspense>
      </ErrorBoundary>
    </div>
  );
}
