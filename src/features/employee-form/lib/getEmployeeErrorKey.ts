import type { ApiError } from '@/shared/api';

export function getEmployeeErrorKey(error: ApiError): string {
  if (error.status !== 422) return error.i18nKey;

  if (error.validationErrors?.email?.length) {
    return 'emailAlreadyTaken';
  }

  if (error.validationErrors?.role?.length) {
    return 'roleRequired';
  }

  return error.i18nKey;
}
