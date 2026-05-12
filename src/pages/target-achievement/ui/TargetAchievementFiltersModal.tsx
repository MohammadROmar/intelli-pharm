import { useMemo } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { AlertCircle, CalendarDays } from 'lucide-react';

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  FiltersModal,
  GenericSingleSelect,
  Input,
  Separator,
} from '@/shared/ui';

export type TargetAchievementFilters = {
  achieved_at?: string;
  year?: string;
  month?: string;
  quarter?: string;
};

function buildYearOptions(): { id: string; name: string }[] {
  const current = new Date().getFullYear();
  const options = [];
  for (let y = current; y >= current - 3; y--) {
    options.push({ id: String(y), name: String(y) });
  }
  return options;
}

const YEAR_OPTIONS = buildYearOptions();

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultValues?: TargetAchievementFilters;
  onApply: (filters: TargetAchievementFilters) => void;
  hasActiveFilters?: boolean;
  onClear: () => void;
};

export function TargetAchievementFiltersModal({
  open,
  onOpenChange,
  defaultValues = {},
  hasActiveFilters,
  onApply,
  onClear,
}: Props) {
  const { t } = useTranslation('translation', {
    keyPrefix: 'targetsPage.achievementFilters',
  });

  const MONTH_OPTIONS = useMemo(
    () => [
      { id: '1', name: t('months.january') },
      { id: '2', name: t('months.february') },
      { id: '3', name: t('months.march') },
      { id: '4', name: t('months.april') },
      { id: '5', name: t('months.may') },
      { id: '6', name: t('months.june') },
      { id: '7', name: t('months.july') },
      { id: '8', name: t('months.august') },
      { id: '9', name: t('months.september') },
      { id: '10', name: t('months.october') },
      { id: '11', name: t('months.november') },
      { id: '12', name: t('months.december') },
    ],
    [t],
  );

  const QUARTER_OPTIONS = useMemo(
    () => [
      {
        id: '1',
        name: `Q1 — ${t('months.january')} · ${t('months.february')} · ${t('months.march')}`,
      },
      {
        id: '2',
        name: `Q2 — ${t('months.april')} · ${t('months.may')} · ${t('months.june')}`,
      },
      {
        id: '3',
        name: `Q3 — ${t('months.july')} · ${t('months.august')} · ${t('months.september')}`,
      },
      {
        id: '4',
        name: `Q4 — ${t('months.october')} · ${t('months.november')} · ${t('months.december')}`,
      },
    ],
    [t],
  );

  const { register, control, handleSubmit, getValues, trigger } =
    useForm<TargetAchievementFilters>({
      defaultValues,
      mode: 'onSubmit',
    });

  const watchedMonth = useWatch({ control, name: 'month' });
  const watchedQuarter = useWatch({ control, name: 'quarter' });

  const hasMonth = !!watchedMonth && watchedMonth !== '';
  const hasQuarter = !!watchedQuarter && watchedQuarter !== '';
  const yearRequired = hasMonth || hasQuarter;

  function onSubmit(values: TargetAchievementFilters) {
    const cleaned: TargetAchievementFilters = Object.fromEntries(
      Object.entries(values).filter(([, v]) => v !== '' && v !== undefined),
    );
    onApply(cleaned);
  }

  return (
    <FiltersModal
      open={open}
      onOpenChange={onOpenChange}
      title={t('title')}
      subtitle={t('subtitle')}
      form="achievement-filters-form"
      hasActiveFilters={hasActiveFilters}
      onClear={onClear}
    >
      <form
        id="achievement-filters-form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="space-y-4 py-2"
      >
        <Field>
          <FieldLabel htmlFor="filter-achieved-at">
            {t('achievedAtLabel')}
          </FieldLabel>
          <Input
            id="filter-achieved-at"
            type="date"
            {...register('achieved_at')}
          />
        </Field>

        <Separator />

        <Controller
          name="year"
          control={control}
          rules={{
            validate: {
              requiredWithPeriod: (v) => {
                const month = getValues('month');
                const quarter = getValues('quarter');
                const hasPeriod =
                  (!!month && month !== '') || (!!quarter && quarter !== '');
                if (hasPeriod && (!v || v === '')) {
                  return 'targetsPage.achievementFilters.errors.yearRequired';
                }
                return true;
              },
            },
          }}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel asChild>
                <p>
                  {t('yearLabel')}
                  {yearRequired && (
                    <span className="text-destructive ml-0.5">*</span>
                  )}
                </p>
              </FieldLabel>
              <GenericSingleSelect
                options={YEAR_OPTIONS}
                valueKey="id"
                labelKey="name"
                value={field.value ?? ''}
                onValueChange={field.onChange}
                icon={CalendarDays}
                hasMoreLabel={false}
              />
              {yearRequired && !fieldState.invalid && (
                <FieldDescription className="flex items-center gap-1.5 text-xs">
                  <AlertCircle className="text-muted-foreground size-3 shrink-0" />
                  {t('yearRequiredHint')}
                </FieldDescription>
              )}
              {fieldState.invalid && (
                <FieldError>{t('errors.yearRequired')}</FieldError>
              )}
            </Field>
          )}
        />

        <div className="grid grid-cols-2 gap-3">
          <Controller
            name="month"
            control={control}
            render={({ field }) => (
              <Field>
                <FieldLabel asChild>
                  <p>
                    {t('monthLabel')}
                    {hasQuarter && (
                      <span className="text-muted-foreground ml-1 text-[10px] font-normal">
                        {t('mutuallyExclusive')}
                      </span>
                    )}
                  </p>
                </FieldLabel>
                <GenericSingleSelect
                  options={MONTH_OPTIONS}
                  valueKey="id"
                  labelKey="name"
                  value={field.value ?? ''}
                  onValueChange={(v) => {
                    field.onChange(v);
                    if (v) trigger('year');
                  }}
                  disabled={hasQuarter}
                  icon={CalendarDays}
                  hasMoreLabel={false}
                />
              </Field>
            )}
          />

          <Controller
            name="quarter"
            control={control}
            render={({ field }) => (
              <Field>
                <FieldLabel asChild>
                  <p>
                    {t('quarterLabel')}
                    {hasMonth && (
                      <span className="text-muted-foreground ml-1 text-[10px] font-normal">
                        {t('mutuallyExclusive')}
                      </span>
                    )}
                  </p>
                </FieldLabel>
                <GenericSingleSelect
                  options={QUARTER_OPTIONS}
                  valueKey="id"
                  labelKey="name"
                  value={field.value ?? ''}
                  onValueChange={(v) => {
                    field.onChange(v);
                    if (v) trigger('year');
                  }}
                  disabled={hasMonth}
                  icon={CalendarDays}
                  hasMoreLabel={false}
                />
              </Field>
            )}
          />
        </div>

        {(hasMonth || hasQuarter) && (
          <p className="text-muted-foreground flex items-center gap-1.5 text-xs">
            <AlertCircle className="size-3 shrink-0" />
            {t('mutualExclusionHint')}
          </p>
        )}
      </form>
    </FiltersModal>
  );
}
