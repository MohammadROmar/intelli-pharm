import { useSearchParams } from 'react-router-dom';

import type { PharmacyFilters } from '@/entities/pharmacy';
import { useFilters } from '@/shared/lib';

const FILTER_KEYS: (keyof PharmacyFilters)[] = [
  'name',
  'region',
  'pharmacist_name',
  'pharmacist_phone',
  'pharmacist_alt_phone',
];

export function usePharmacyFilters() {
  const [searchParams] = useSearchParams();

  const filters: PharmacyFilters = {
    name: searchParams.get('name') ?? undefined,
    region: searchParams.get('region') ?? undefined,
    pharmacist_name: searchParams.get('pharmacist_name') ?? undefined,
    pharmacist_phone: searchParams.get('pharmacist_phone') ?? undefined,
    pharmacist_alt_phone: searchParams.get('pharmacist_alt_phone') ?? undefined,
  };

  return useFilters<PharmacyFilters>({ filters, filterKeys: FILTER_KEYS });
}
