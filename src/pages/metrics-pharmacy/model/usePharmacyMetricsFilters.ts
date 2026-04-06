import { useSearchParams } from 'react-router-dom';

import { useFilters } from '@/shared/lib';

type MetricsPharmacyFilters = { pharmacy_id?: string | number | null };

const FILTER_KEYS: (keyof MetricsPharmacyFilters)[] = ['pharmacy_id'];

export function usePharmacyMetricsFilters() {
  const [searchParams] = useSearchParams();

  const filters = {
    pharmacy_id: searchParams.get('pharmacy_id') ?? undefined,
  };

  return useFilters<MetricsPharmacyFilters>({
    filters,
    filterKeys: FILTER_KEYS,
  });
}
