import { useTranslation } from 'react-i18next';

import { cn } from '../lib';
import { Field } from './Field';
import { Button } from './Button';

type FormActionsProps = {
  isLoading?: boolean;
  onReset: () => void;
  isEdit?: boolean;
  label?: string;
  resetLabel?: string;
  form?: string;
  classNames?: { container?: string; reset?: string; submit?: string };
};

export function FormActions({
  onReset,
  isLoading,
  isEdit = false,
  label,
  resetLabel,
  form,
  classNames,
}: FormActionsProps) {
  const { t } = useTranslation('common', { keyPrefix: 'form.actions' });

  return (
    <Field>
      <div
        className={cn(
          'flex w-full flex-col-reverse gap-2 lg:flex-row lg:items-end lg:justify-end',
          classNames?.container,
        )}
      >
        <Button
          type="button"
          variant="secondary"
          disabled={isLoading}
          onClick={() => onReset()}
          className={classNames?.reset}
        >
          {resetLabel ?? t('reset')}
        </Button>
        <Button
          type="submit"
          isLoading={isLoading}
          disabled={isLoading}
          form={form}
          className={cn(classNames?.submit, 'disabled:button-shimmer')}
        >
          {label ?? t(`${isEdit ? 'edit' : 'create'}`)}
        </Button>
      </div>
    </Field>
  );
}
