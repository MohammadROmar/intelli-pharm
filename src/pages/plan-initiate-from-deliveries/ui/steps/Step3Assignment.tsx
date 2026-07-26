import { useCallback, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Users } from 'lucide-react';

import {
  RepIdField,
  WizardNavigation,
  repIdRequired,
} from '@/features/plan-initiate-wizard';
import { Card, CardContent, CardHeader, CardSectionHeader } from '@/shared/ui';

import { TOTAL_STEPS } from '../../model/plannerWizardTypes';
import { useDeliveryPlanWizard } from '../../model/PlannerWizardContext';
import type { AssignmentSlice } from '../../model/plannerWizardTypes';

type Props = { onSubmit: () => void; isPending?: boolean };

export function Step3Assignment({ onSubmit, isPending }: Props) {
  const { t } = useTranslation('planner');
  const { state, dispatch } = useDeliveryPlanWizard();

  const { control, handleSubmit } = useForm<AssignmentSlice>({
    defaultValues: state.assignment,
    mode: 'onTouched',
  });

  const submitRef = useRef<HTMLButtonElement>(null);

  const handleTriggerSubmit = useCallback(() => {
    submitRef.current?.click();
  }, []);

  function onValidSubmit(values: AssignmentSlice) {
    dispatch({ type: 'UPDATE_ASSIGNMENT', payload: values });
    onSubmit();
  }

  return (
    <form
      onSubmit={handleSubmit(onValidSubmit)}
      noValidate
      className="space-y-6"
    >
      <Card>
        <CardHeader>
          <CardSectionHeader
            title={t('assignment.cardTitle')}
            description={t('fromDeliveries.assignmentCardSubtitle')}
            icon={Users}
          />
        </CardHeader>
        <CardContent className="space-y-5">
          <Controller
            name="rep_id"
            control={control}
            rules={{ validate: repIdRequired }}
            render={({ field, fieldState }) => (
              <RepIdField
                role="distributor"
                value={field.value}
                onChange={field.onChange}
                invalid={fieldState.invalid}
              />
            )}
          />
        </CardContent>
      </Card>

      {/*
        This is the wizard's last step, so `WizardNavigation`'s "next" button
        is already in submit mode (isLast). Routing that click through a
        hidden submit button — same trick ConfigStep uses — makes sure
        react-hook-form validates `rep_id` before `onValidSubmit` ever runs,
        instead of firing the mutation straight from the nav bar.
      */}
      <button type="submit" ref={submitRef} className="hidden" aria-hidden />

      <WizardNavigation
        step={state.step}
        dispatch={dispatch}
        totalSteps={TOTAL_STEPS}
        isSubmitting={isPending}
        onSubmit={handleTriggerSubmit}
      />
    </form>
  );
}
