import type { FieldError } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

type TranslatedError = { message: string; type: string };

export function useFieldError() {
  const { t } = useTranslation('common', { keyPrefix: 'form.errors' });

  function te(
    error: FieldError | undefined,
    fieldKey: string,
  ): [TranslatedError] | undefined {
    if (!error?.message) return undefined;
    return [
      {
        ...error,
        message: t(error.message, { field: t(fieldKey) }),
      },
    ];
  }

  return { te };
}
