import type { PharmacyDetail } from '../model/pharmacyTypes';

export function pharmacyToPayload(pharmacy: PharmacyDetail): PharmacyDetail {
  return {
    ...pharmacy,
    is_active: pharmacy.is_active ?? false,
    opening_time: pharmacy.opening_time.slice(0, 5),
    closing_time: pharmacy.closing_time.slice(0, 5),
  };
}
