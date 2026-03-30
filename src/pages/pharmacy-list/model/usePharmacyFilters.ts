import { useSearchParams } from 'react-router-dom';

import type { PharmacyFilters } from '@/entities/pharmacy';
import { useFilters } from '@/shared/lib';

const FILTER_KEYS: (keyof PharmacyFilters)[] = ['name', 'region'];

export function usePharmacyFilters() {
  const [searchParams] = useSearchParams();

  const filters: PharmacyFilters = {
    name: searchParams.get('name') ?? undefined,
    region: searchParams.get('region') ?? undefined,
  };

  return useFilters<PharmacyFilters>({ filters, filterKeys: FILTER_KEYS });
}
