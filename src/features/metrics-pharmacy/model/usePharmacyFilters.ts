import { useSearchParams } from 'react-router-dom';

import { useFilters, parseFilters } from '@/shared/lib';
import type { PharmacyFilters } from '@/entities/metrics';

const FILTER_KEYS: (keyof PharmacyFilters)[] = ['pharmacy_id'];

export function usePharmacyFilters() {
  const [searchParams] = useSearchParams();
  const filters = parseFilters<PharmacyFilters>(searchParams);
  return useFilters<PharmacyFilters>({ filters, filterKeys: FILTER_KEYS });
}
