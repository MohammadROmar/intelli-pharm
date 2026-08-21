import type { ApiError } from '@/shared/api';

const PHARMACY_HAS_RELATIONS_MESSAGE =
  'cannot delete this pharmacy because it has related orders, visits, coupons, or debts.';

export function getPharmacyDeleteErrorKey(error: ApiError): string {
  const isRelatedRecordsConflict =
    error.status === 409 &&
    error.message.trim().toLowerCase() === PHARMACY_HAS_RELATIONS_MESSAGE;

  if (isRelatedRecordsConflict) {
    return 'pharmacy.hasRelatedRecords';
  }

  return error.i18nKey;
}
