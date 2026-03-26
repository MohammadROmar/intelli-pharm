import { useMemo } from 'react';
import {
  Controller,
  useFormContext,
  useFormState,
  useWatch,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Clock, Shield, Truck, User } from 'lucide-react';

import { getRoles } from '../lib/getRoles';
import type { EmployeeInternalFormData } from '../model/employeeTypes';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Field,
  FieldError,
  FieldLabel,
  FormSectionHeader,
  GenericSingleSelect,
  Input,
  SwitchRow,
} from '@/shared/ui';

type Props = { isLoading?: boolean };

export function EmployeeInfoCard({ isLoading }: Props) {
  const { register, getValues, control } =
    useFormContext<EmployeeInternalFormData>();
  const { errors } = useFormState<EmployeeInternalFormData>({
    name: ['role', 'is_active', 'working_start', 'working_end'],
  });

  const isDistributor = useWatch({ control, name: 'role' }) === 'distributor';

  const { t } = useTranslation();

  const roles = useMemo(() => getRoles(t), [t]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('employeesPage.form.employmentInfoTitle')}</CardTitle>
        <CardDescription>
          {t('employeesPage.form.employmentInfoSubtitle')}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-5">
        <FormSectionHeader
          icon={User}
          title={t('employeesPage.form.innerEmploymentInfoTitle')}
          description={t('employeesPage.form.innerEmploymentInfoSubtitle')}
        />

        <Controller
          name="is_active"
          control={control}
          render={({ field }) => (
            <SwitchRow
              id="active"
              disabled={isLoading}
              label={t('form.fields.active')}
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          )}
        />

        <Field data-invalid={!!errors.role}>
          <FieldLabel asChild>
            <p>{t('form.fields.role')}</p>
          </FieldLabel>
          <Controller
            name="role"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <GenericSingleSelect
                disabled={isLoading}
                invalid={!!errors.role}
                options={roles}
                valueKey="value"
                labelKey="label"
                icon={Shield}
                value={field.value}
                onValueChange={field.onChange}
                hasMoreLabel={false}
              />
            )}
          />
          {errors.role && (
            <FieldError data-invalid={!!errors.working_start}>
              {t('form.errors.required')}
            </FieldError>
          )}
        </Field>

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
              <FieldError>{t('form.errors.required')}</FieldError>
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
            step="1"
            lang="en-GB"
            aria-invalid={!!errors.working_start}
            className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
            {...register('working_start', {
              required: true,
              disabled: isLoading,
            })}
          />
          {errors.working_start && (
            <FieldError>{t('form.errors.required')}</FieldError>
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
            step="1"
            lang="en-GB"
            aria-invalid={!!errors.working_end}
            className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
            {...register('working_end', {
              required: 'form.errors.required',
              validate: (value) => {
                const start = getValues('working_start');
                return value > start || 'form.errors.endAfterStart';
              },
              disabled: isLoading,
            })}
          />
          {errors.working_end?.message && (
            <FieldError>{t(errors.working_end.message)}</FieldError>
          )}
        </Field>
      </CardContent>
    </Card>
  );
}
