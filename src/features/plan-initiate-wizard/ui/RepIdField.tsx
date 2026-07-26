import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { EmployeeSelector, type EmployeeRole } from '@/entities/employee';
import { Field, FieldError, FieldLabel } from '@/shared/ui';

type Props = {
  value: number | null;
  role?: EmployeeRole;
  onChange: (value: number | null) => void;
  invalid?: boolean;
};

export const RepIdField = memo(function RepIdField({
  value,
  onChange,
  role,
  invalid,
}: Props) {
  const { t } = useTranslation('planner');

  const handleValueChange = useCallback(
    (next: string | number | null) => {
      onChange(typeof next === 'number' ? next : null);
    },
    [onChange],
  );

  return (
    <Field data-invalid={invalid}>
      <FieldLabel asChild>
        <p>{t('assignment.repLabel')}</p>
      </FieldLabel>
      <EmployeeSelector
        role={role}
        value={value}
        onValueChange={handleValueChange}
        invalid={invalid}
      />
      {invalid && <FieldError>{t('assignment.errors.repRequired')}</FieldError>}
    </Field>
  );
});
