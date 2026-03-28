import { useSearchParams } from 'react-router-dom';

import type { BooleanFilter, MedicineFilters } from '@/entities/medicine';
import { useFilters } from '@/shared/lib';

const FILTER_KEYS: (keyof MedicineFilters)[] = [
  'name',
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

  const filters: MedicineFilters = {
    name: searchParams.get('name') ?? undefined,
    category: searchParams.get('category') ?? undefined,
    min_price: searchParams.get('min_price') ?? undefined,
    max_price: searchParams.get('max_price') ?? undefined,
    imported: (searchParams.get('imported') ?? undefined) as BooleanFilter,
    laboratory: searchParams.get('laboratory') ?? undefined,
    active: (searchParams.get('active') ?? undefined) as BooleanFilter,
    alternative_for: searchParams.get('alternative_for') ?? undefined,
  };

  return useFilters<MedicineFilters>({ filters, filterKeys: FILTER_KEYS });
}
