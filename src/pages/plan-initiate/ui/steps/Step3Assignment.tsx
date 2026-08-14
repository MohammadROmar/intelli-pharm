import { useCallback, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Users } from 'lucide-react';

import { RegionSelector } from '@/entities/region';
import {
  RepIdField,
  WizardNavigation,
  repIdRequired,
} from '@/features/plan-initiate-wizard';
import {
  Card,
  CardContent,
  CardHeader,
  CardSectionHeader,
  Field,
  FieldError,
  FieldLabel,
  UnavailableField,
} from '@/shared/ui';

import { TOTAL_STEPS } from '../../model/plannerWizardTypes';
import { usePlannerWizard } from '../../model/store';
import type { AssignmentSlice } from '../../model/plannerWizardTypes';

type Props = { canViewEmployees: boolean; canViewRegions: boolean };

export function Step3Assignment({ canViewEmployees, canViewRegions }: Props) {
  const { t } = useTranslation('planner');
  const { state, dispatch } = usePlannerWizard();

  const { control, handleSubmit } = useForm<AssignmentSlice>({
    defaultValues: state.assignment,
    mode: 'onTouched',
  });

  const submitRef = useRef<HTMLButtonElement>(null);

  const handleNavigateNext = useCallback(() => {
    submitRef.current?.click();
  }, []);

  function onValidSubmit(values: AssignmentSlice) {
    if (values.region_id !== state.assignment.region_id) {
      dispatch({ type: 'UPDATE_PHARMACIES', payload: { pharmacy_ids: [] } });
    }

    dispatch({ type: 'UPDATE_ASSIGNMENT', payload: values });
    dispatch({ type: 'SET_STEP', payload: 4 });
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
            description={t('assignment.cardSubtitle')}
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
                canView={canViewEmployees}
                role="rep"
                value={field.value}
                onChange={field.onChange}
                invalid={fieldState.invalid}
              />
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
                {canViewRegions ? (
                  <RegionSelector
                    value={field.value}
                    onValueChange={field.onChange}
                    invalid={fieldState.invalid}
                  />
                ) : (
                  <UnavailableField invalid={fieldState.invalid} />
                )}
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

      <button type="submit" ref={submitRef} className="hidden" aria-hidden />

      <WizardNavigation
        step={state.step}
        dispatch={dispatch}
        totalSteps={TOTAL_STEPS}
        canProceed
        onNext={handleNavigateNext}
      />
    </form>
  );
}
