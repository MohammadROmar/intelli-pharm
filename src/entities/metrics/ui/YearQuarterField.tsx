import { useController } from 'react-hook-form';
import type { Control, FieldValues, Path } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Field, FieldLabel, FieldError } from '@/shared/ui';
import { YearQuarterPicker } from './YearQuarterPicker';

export type PeriodFormValues = FieldValues & {
  year?: string | number | null;
  quarter?: string | number | null;
};

type Props<T extends PeriodFormValues> = { control: Control<T> };

export function YearQuarterField<T extends PeriodFormValues>({
  control,
}: Props<T>) {
  const { t } = useTranslation('metrics', { keyPrefix: 'filters.shared' });

  const { field: yearField } = useController({
    name: 'year' as Path<T>,
    control,
  });

  const { field: quarterField, fieldState: quarterState } = useController({
    name: 'quarter' as Path<T>,
    control,
    rules: {
      validate: (value, formValues) => {
        if (formValues.year && !value) return t('validation.quarterRequired');
        return true;
      },
    },
  });

  return (
    <Field>
      <FieldLabel asChild>
        <p>{t('periodLabel')}</p>
      </FieldLabel>
      <YearQuarterPicker
        year={yearField.value as string | undefined}
        quarter={quarterField.value as string | undefined}
        onChange={({ year: nextYear, quarter: nextQuarter }) => {
          yearField.onChange(nextYear ?? null);
          quarterField.onChange(nextQuarter ?? null);
        }}
      />
      {quarterState.error && (
        <FieldError className="text-xs">
          {quarterState.error.message}
        </FieldError>
      )}
    </Field>
  );
}
