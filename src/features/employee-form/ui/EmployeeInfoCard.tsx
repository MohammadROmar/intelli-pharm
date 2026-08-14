import {
  Controller,
  useFormContext,
  useFormState,
  useWatch,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Clock, Truck, Briefcase } from 'lucide-react';

import { RoleSelector } from '@/entities/role';
import { useHasPermission } from '@/entities/session';
import type { EmployeeInternalFormData } from '@/entities/employee';
import {
  Card,
  CardContent,
  CardHeader,
  Field,
  FieldError,
  FieldLabel,
  CardSectionHeader,
  Input,
  SwitchRow,
  UnavailableField,
} from '@/shared/ui';

type Props = { isLoading?: boolean };

export function EmployeeInfoCard({ isLoading }: Props) {
  const { register, getValues, control } =
    useFormContext<EmployeeInternalFormData>();
  const { errors } = useFormState<EmployeeInternalFormData>({
    name: ['role', 'is_active', 'working_start', 'working_end'],
  });

  const isDistributor = useWatch({ control, name: 'role' }) === 'distributor';

  const { t } = useTranslation('employees');
  const { t: tCommon } = useTranslation('common', { keyPrefix: 'form' });

  const canFilterByRoles = useHasPermission('auth.roles.view');

  return (
    <Card>
      <CardHeader>
        <CardSectionHeader
          icon={Briefcase}
          title={t('form.employmentInfoTitle')}
          description={t('form.employmentInfoSubtitle')}
        />
      </CardHeader>

      <CardContent className="space-y-5">
        <Controller
          name="is_active"
          control={control}
          render={({ field }) => (
            <SwitchRow
              id="active"
              disabled={isLoading}
              label={t('form.fields.active')}
              description={t('form.activeDescription')}
              checked={field.value ?? false}
              onCheckedChange={field.onChange}
            />
          )}
        />

        <Controller
          name="role"
          control={control}
          rules={{ required: true }}
          render={({ field, fieldState }) => (
            <Field data-invalid={!!errors.role}>
              <FieldLabel asChild>
                <p>{t('form.fields.role')}</p>
              </FieldLabel>
              {canFilterByRoles ? (
                <RoleSelector
                  isLoading={isLoading}
                  invalid={fieldState.invalid}
                  value={field.value}
                  onValueChange={field.onChange}
                />
              ) : (
                <UnavailableField invalid={fieldState.invalid} />
              )}
              {errors.role && (
                <FieldError data-invalid={!!errors.working_start}>
                  {tCommon('errors.required')}
                </FieldError>
              )}
            </Field>
          )}
        />

        {isDistributor && (
          <Field data-invalid={!!errors.vehicle_capacity}>
            <FieldLabel htmlFor="vehicle_capacity">
              {t('form.fields.vehicleCapacity')}
            </FieldLabel>
            <Input
              id="vehicle_capacity"
              type="number"
              autoComplete="off"
              icon={Truck}
              min="0"
              placeholder="0.00"
              aria-invalid={!!errors.vehicle_capacity}
              {...register('vehicle_capacity', {
                required: true,
                disabled: isLoading,
                valueAsNumber: true,
                shouldUnregister: true,
              })}
            />
            {errors.vehicle_capacity && (
              <FieldError>{tCommon('errors.required')}</FieldError>
            )}
          </Field>
        )}

        <Field data-invalid={!!errors.working_start}>
          <FieldLabel htmlFor="working_start">
            {t('form.fields.workingStart')}
          </FieldLabel>
          <Input
            id="working_start"
            type="time"
            autoComplete="off"
            icon={Clock}
            aria-invalid={!!errors.working_start}
            {...register('working_start', {
              required: true,
              disabled: isLoading,
            })}
          />
          {errors.working_start && (
            <FieldError>{tCommon('errors.required')}</FieldError>
          )}
        </Field>

        <Field data-invalid={!!errors.working_end}>
          <FieldLabel htmlFor="working_end">
            {t('form.fields.workingEnd')}
          </FieldLabel>
          <Input
            id="working_end"
            type="time"
            autoComplete="off"
            icon={Clock}
            aria-invalid={!!errors.working_end}
            {...register('working_end', {
              required: 'errors.required',
              validate: (value) => {
                const start = getValues('working_start');
                return value > start || 'errors.endAfterStart';
              },
              disabled: isLoading,
            })}
          />
          {errors.working_end?.message && (
            <FieldError>{tCommon(errors.working_end.message)}</FieldError>
          )}
        </Field>
      </CardContent>
    </Card>
  );
}
