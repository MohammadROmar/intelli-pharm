import { useSearchParams } from 'react-router-dom';

import { useFilters, parseFilters } from '@/shared/lib';
import type { MedicineFilters } from '@/entities/metrics';

const FILTER_KEYS: (keyof MedicineFilters)[] = [
  'quarter',
  'year',
  'medicine_id',
];

export function useMedicineFilters() {
  const [searchParams] = useSearchParams();
  const filters = parseFilters<MedicineFilters>(searchParams);
  return useFilters<MedicineFilters>({ filters, filterKeys: FILTER_KEYS });
}
