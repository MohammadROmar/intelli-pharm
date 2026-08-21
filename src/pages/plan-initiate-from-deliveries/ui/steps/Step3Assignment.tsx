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
import { useDeliveryPlanWizard } from '../../model/store';
import type { AssignmentSlice } from '../../model/plannerWizardTypes';
import { useHasPermission } from '@/entities/session';

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

  const canView = useHasPermission('erp.employees.view');

  function onValidChange(rep_id: number) {
    dispatch({ type: 'UPDATE_ASSIGNMENT', payload: { rep_id } });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
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
                onChange={(v) => {
                  onValidChange(v as number);
                  field.onChange(v);
                }}
                invalid={fieldState.invalid}
                canView={canView}
              />
            )}
          />
        </CardContent>
      </Card>

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
