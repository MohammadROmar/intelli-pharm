import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, ArrowRight, Users } from 'lucide-react';

import { RegionSelector } from '@/entities/region';
import { EmployeeSelector } from '@/entities/employee';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardSectionHeader,
  Field,
  FieldError,
  FieldLabel,
} from '@/shared/ui';

import { usePlannerWizard } from '../../model/PlannerWizardContext';
import type { AssignmentSlice } from '../../model/plannerWizardTypes';

export function Step3Assignment() {
  const { t } = useTranslation('planner');
  const { state, dispatch } = usePlannerWizard();

  const { control, handleSubmit } = useForm<AssignmentSlice>({
    defaultValues: state.assignment,
    mode: 'onTouched',
  });

  function onNext(values: AssignmentSlice) {
    dispatch({ type: 'UPDATE_ASSIGNMENT', payload: values });
    dispatch({ type: 'SET_STEP', payload: 4 });
  }

  return (
    <form onSubmit={handleSubmit(onNext)} noValidate className="space-y-6">
      <Card>
        <CardHeader>
          <CardSectionHeader
            title={t('assignment.cardTitle')}
            description={t('assignment.cardSubtitle')}
            icon={Users}
          />
        </CardHeader>
        <CardContent className="space-y-5">
          <Controller
            name="rep_id"
            control={control}
            rules={{
              validate: (v) => v !== null || 'assignment.errors.repRequired',
            }}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel asChild>
                  <p>{t('assignment.repLabel')}</p>
                </FieldLabel>
                <EmployeeSelector
                  value={field.value}
                  onValueChange={field.onChange}
                  invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError>{t('assignment.errors.repRequired')}</FieldError>
                )}
              </Field>
            )}
          />

          <Controller
            name="region_id"
            control={control}
            rules={{
              validate: (v) => v !== null || 'assignment.errors.regionRequired',
            }}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel asChild>
                  <p>{t('assignment.regionLabel')}</p>
                </FieldLabel>
                <RegionSelector
                  value={field.value}
                  onValueChange={field.onChange}
                  invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError>
                    {t('assignment.errors.regionRequired')}
                  </FieldError>
                )}
              </Field>
            )}
          />
        </CardContent>
      </Card>

      <div className="flex items-center justify-between pt-2">
        <Button
          type="button"
          variant="ghost"
          onClick={() => dispatch({ type: 'SET_STEP', payload: 2 })}
          className="gap-2"
        >
          <ArrowLeft className="size-4 rtl:rotate-180" />
          {t('nav.back')}
        </Button>

        <Button type="submit">
          <ArrowRight className="size-4 rtl:rotate-180" />
          {t('nav.next')}
        </Button>
      </div>
    </form>
  );
}
