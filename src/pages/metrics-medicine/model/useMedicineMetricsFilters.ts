import { useSearchParams } from 'react-router-dom';

import { useFilters, parseFilters } from '@/shared/lib';
import type { MedicineMetricsFilters } from './medicineMetricsTypes';

const FILTER_KEYS: (keyof MedicineMetricsFilters)[] = [
  'medicine_id',
  'quarter',
  'year',
];

export function useMedicineMetricsFilters() {
  const [searchParams] = useSearchParams();

  const filters = parseFilters<MedicineMetricsFilters>(searchParams);

  return useFilters<MedicineMetricsFilters>({
    filters,
    filterKeys: FILTER_KEYS,
  });
}
