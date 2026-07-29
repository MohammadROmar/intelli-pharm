import { useSearchParams } from 'react-router';

import type { CategoryFilters } from '@/entities/category';
import { useFilters, parseFilters } from '@/shared/lib';

const FILTER_KEYS: (keyof CategoryFilters)[] = ['name', 'parent_id'];

export function useCategoryFilters() {
  const [searchParams] = useSearchParams();

  const filters = parseFilters<CategoryFilters>(searchParams);

  return useFilters<CategoryFilters>({ filters, filterKeys: FILTER_KEYS });
}
