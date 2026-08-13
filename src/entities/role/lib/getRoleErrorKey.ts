import type { ApiError } from '@/shared/api';

export function getRoleErrorKey(error: ApiError): string {
  if (error.status !== 422) return error.i18nKey;

  if (error.validationErrors?.name?.length) {
    return 'nameAlreadyTaken';
  }

  if (error.validationErrors?.permissions?.length) {
    return 'permissionsRequired';
  }

  return error.i18nKey;
}
