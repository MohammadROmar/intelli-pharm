import { useSearchParams } from 'react-router-dom';

import type { MedicineFilters } from '@/entities/medicine';
import { parseFilters, useFilters } from '@/shared/lib';

const FILTER_KEYS: (keyof MedicineFilters)[] = [
  'name',
  'scientific_name',
  'category',
  'min_price',
  'max_price',
  'imported',
  'laboratory',
  'active',
  'alternative_for',
];

export function useMedicineFilters() {
  const [searchParams] = useSearchParams();

  const filters = parseFilters<MedicineFilters>(searchParams, {
    imported: 'boolean',
    active: 'boolean',
  });

  return useFilters<MedicineFilters>({
    filters,
    filterKeys: FILTER_KEYS,
  });
}
