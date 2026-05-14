import { useSearchParams } from 'react-router-dom';

import type { PharmacyFilters } from '@/entities/pharmacy';
import { useFilters, parseFilters } from '@/shared/lib';

const FILTER_KEYS: (keyof PharmacyFilters)[] = [
  'name',
  'region',
  'pharmacist_name',
  'pharmacist_phone',
  'pharmacist_alt_phone',
];

export function usePharmacyFilters() {
  const [searchParams] = useSearchParams();

  const filters = parseFilters<PharmacyFilters>(searchParams);

  return useFilters<PharmacyFilters>({ filters, filterKeys: FILTER_KEYS });
}
