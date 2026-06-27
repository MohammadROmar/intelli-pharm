import type { TFunction } from 'i18next';

import type { PharmacyDetail } from '../model/pharmacyTypes';

export function getWeekDays(t: TFunction) {
  const WEEK_DAYS = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
  ] as const;

  return WEEK_DAYS.map((day) => ({
    label: t(`days.${day}`),
    value: day,
  }));
}

export function pharmacyToPayload(pharmacy: PharmacyDetail): PharmacyDetail {
  return {
    ...pharmacy,
    is_active: pharmacy.is_active ?? false,
    opening_time: pharmacy.opening_time.slice(0, 5),
    closing_time: pharmacy.closing_time.slice(0, 5),
  };
}
