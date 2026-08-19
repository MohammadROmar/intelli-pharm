import type { ApiError } from '@/shared/api';

const INVALID_CREDENTIALS_MESSAGE = 'invalid credentials';
const MISSING_PERMISSIONS_KEY = 'missing permissions';
const DASHBOARD_ACCESS_PERMISSION = 'dashboard.access';

export function getLoginErrorKey(error: ApiError): string {
  const isInvalidCredentials =
    (error.status === 400 || error.status === 401) &&
    error.message.trim().toLowerCase() === INVALID_CREDENTIALS_MESSAGE;

  if (isInvalidCredentials) {
    return 'login.invalidCredentials';
  }

  const missingPermission = Array.isArray(error.errors)
    ? undefined
    : error.errors?.[MISSING_PERMISSIONS_KEY];

  if (
    error.status === 403 &&
    missingPermission === DASHBOARD_ACCESS_PERMISSION
  ) {
    return 'login.noDashboardAccess';
  }

  return error.i18nKey;
}
