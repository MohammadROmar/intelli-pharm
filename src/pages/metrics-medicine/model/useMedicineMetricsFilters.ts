import { useSearchParams } from 'react-router-dom';

import { useFilters } from '@/shared/lib';
import type { MedicineMetricsFilters } from './medicineMetricsTypes';

const FILTER_KEYS: (keyof MedicineMetricsFilters)[] = [
  'medicine_id',
  'quarter',
  'year',
];

export function useMedicineMetricsFilters() {
  const [searchParams] = useSearchParams();

  const filters: MedicineMetricsFilters = {
    medicine_id: searchParams.get('medicine_id'),
    quarter: searchParams.get('quarter'),
    year: searchParams.get('year'),
  };

  return useFilters<MedicineMetricsFilters>({
    filters,
    filterKeys: FILTER_KEYS,
  });
}
