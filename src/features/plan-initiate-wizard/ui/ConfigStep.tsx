import { useCallback, useMemo, useRef } from 'react';
import type { ElementType } from 'react';
import { useForm, useWatch, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Car, Footprints, StickyNote, Zap } from 'lucide-react';

import { cn } from '@/shared/lib';
import { required } from '@/shared/form';
import {
  Card,
  CardContent,
  CardHeader,
  CardSectionHeader,
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  GenericSingleSelect,
  Textarea,
} from '@/shared/ui';

import { WizardNavigation } from './WizardNavigation';
import type {
  ConfigSlice,
  PlannerProfile,
  TravelMode,
  WizardStepProps,
} from '../model/types';

function TravelModeToggle({
  value,
  onChange,
}: {
  value: TravelMode;
  onChange: (v: TravelMode) => void;
}) {
  const { t } = useTranslation('planner');

  const options: { id: TravelMode; label: string; Icon: ElementType }[] =
    useMemo(
      () => [
        { id: 'driving', label: t('config.modeDriving'), Icon: Car },
        { id: 'walking', label: t('config.modeWalking'), Icon: Footprints },
      ],
      [t],
    );

  return (
    <div className="grid grid-cols-2 gap-3">
      {options.map(({ id, label, Icon }) => (
        <button
          key={id}
          type="button"
          onClick={() => onChange(id)}
          className={cn(
            'flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all',
            value === id
              ? 'border-primary bg-primary/5'
              : 'border-border hover:border-muted-foreground/40 hover:bg-muted/40',
          )}
        >
          <Icon
            className={cn(
              'size-6',
              value === id ? 'text-primary' : 'text-muted-foreground',
            )}
          />
          <span
            className={cn(
              'text-sm font-medium',
              value === id ? 'text-foreground' : 'text-muted-foreground',
            )}
          >
            {label}
          </span>
        </button>
      ))}
    </div>
  );
}

export function ConfigStep({ state, dispatch, totalSteps }: WizardStepProps) {
  const { t } = useTranslation('planner');

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ConfigSlice>({
    defaultValues: state.config,
    mode: 'onTouched',
  });

  const currentProfile = useWatch({ control, name: 'profile' });

  const submitRef = useRef<HTMLButtonElement>(null);

  const handleNavigateNext = useCallback(() => {
    submitRef.current?.click();
  }, []);

  function onValidSubmit(values: ConfigSlice) {
    dispatch({ type: 'UPDATE_CONFIG', payload: values });
    dispatch({ type: 'SET_STEP', payload: 3 });
  }

  const PROFILE_OPTIONS: { id: PlannerProfile; name: string }[] = useMemo(
    () => [
      { id: 'all_factors', name: t('config.profiles.allFactors') },
      { id: 'balanced', name: t('config.profiles.balanced') },
      { id: 'fastest', name: t('config.profiles.fastest') },
      { id: 'cheapest', name: t('config.profiles.cheapest') },
      { id: 'vip_first', name: t('config.profiles.vipFirst') },
      { id: 'time_window_first', name: t('config.profiles.timeWindowFirst') },
      { id: 'pedestrian_light', name: t('config.profiles.pedestrianLight') },
    ],
    [t],
  );

  return (
    <form
      onSubmit={handleSubmit(onValidSubmit)}
      noValidate
      className="space-y-6"
    >
      <Card>
        <CardHeader>
          <CardSectionHeader
            title={t('config.cardTitle')}
            description={t('config.cardSubtitle')}
            icon={Zap}
          />
        </CardHeader>
        <CardContent className="space-y-6">
          <Controller
            name="travel_mode"
            control={control}
            render={({ field }) => (
              <Field>
                <FieldLabel asChild>
                  <p>{t('config.travelModeLabel')}</p>
                </FieldLabel>
                <TravelModeToggle
                  value={field.value}
                  onChange={field.onChange}
                />
              </Field>
            )}
          />

          <Controller
            name="profile"
            control={control}
            render={({ field }) => (
              <Field>
                <FieldLabel asChild>
                  <p>{t('config.profileLabel')}</p>
                </FieldLabel>
                <GenericSingleSelect
                  options={PROFILE_OPTIONS}
                  valueKey="id"
                  labelKey="name"
                  value={field.value}
                  onValueChange={field.onChange}
                  icon={Zap}
                  hasMoreLabel={false}
                />
                <FieldDescription className="text-xs">
                  {t(`config.profileHints.${currentProfile}`)}
                </FieldDescription>
              </Field>
            )}
          />

          <Field data-invalid={!!errors.reason_details}>
            <FieldLabel htmlFor="reason_details">
              {t('config.reasonDetailsLabel')}
            </FieldLabel>
            <Textarea
              id="reason_details"
              rows={3}
              placeholder={t('config.reasonDetailsPlaceholder')}
              className="resize-none"
              icon={StickyNote}
              aria-invalid={!!errors.reason_details}
              {...register('reason_details', {
                required: true,
                validate: required(),
              })}
            />
            {errors.reason_details && (
              <FieldError>{t('config.reasonDetailsRequired')}</FieldError>
            )}
          </Field>
        </CardContent>
      </Card>

      <button type="submit" ref={submitRef} className="hidden" aria-hidden />

      <WizardNavigation
        step={state.step}
        dispatch={dispatch}
        totalSteps={totalSteps}
        canProceed
        onNext={handleNavigateNext}
      />
    </form>
  );
}
