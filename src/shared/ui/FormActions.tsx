import { useTranslation } from 'react-i18next';

import { cn } from '../lib';
import { Field } from './Field';
import { Button } from './Button';

type FormActionsProps = {
  isLoading?: boolean;
  onReset: () => void;
  isCreate?: boolean;
  classNames?: { container?: string; reset?: string; submit?: string };
};

export function FormActions({
  onReset,
  isLoading,
  isCreate = true,
  classNames,
}: FormActionsProps) {
  const { t } = useTranslation('translation', { keyPrefix: 'form.actions' });

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
          {t('reset')}
        </Button>
        <Button
          type="submit"
          isLoading={isLoading}
          disabled={isLoading}
          className={classNames?.submit}
        >
          {t(`${isCreate ? 'create' : 'edit'}`)}
        </Button>
      </div>
    </Field>
  );
}
