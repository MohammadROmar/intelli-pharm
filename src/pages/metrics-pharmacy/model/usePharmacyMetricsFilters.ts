import { useSearchParams } from 'react-router-dom';

import { useFilters, parseFilters } from '@/shared/lib';

type MetricsPharmacyFilters = { pharmacy_id?: string | number | null };

const FILTER_KEYS: (keyof MetricsPharmacyFilters)[] = ['pharmacy_id'];

export function usePharmacyMetricsFilters() {
  const [searchParams] = useSearchParams();

  const filters = parseFilters<MetricsPharmacyFilters>(searchParams);

  return useFilters<MetricsPharmacyFilters>({
    filters,
    filterKeys: FILTER_KEYS,
  });
}
