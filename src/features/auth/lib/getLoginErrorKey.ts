import type { ApiError } from '@/shared/api';

const INVALID_CREDENTIALS_MESSAGE = 'invalid credentials';

export function getLoginErrorKey(error: ApiError): string {
  const isInvalidCredentials =
    (error.status === 400 || error.status === 401) &&
    error.message.trim().toLowerCase() === INVALID_CREDENTIALS_MESSAGE;

  if (isInvalidCredentials) {
    return 'invalidCredentials';
  }

  return error.i18nKey;
}
