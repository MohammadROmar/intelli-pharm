import type { OrderFilters } from '@/entities/order';
import { useFilters, parseFilters } from '@/shared/lib';
import { useSearchParams } from 'react-router-dom';

const FILTER_KEYS: (keyof OrderFilters)[] = [
  'date_from',
  'date_to',
  'max_total',
  'min_total',
  'pharmacy',
  'status',
];

export function useOrderFilters() {
  const [searchParams] = useSearchParams();

  const filters = parseFilters<OrderFilters>(searchParams);

  return useFilters<OrderFilters>({ filters, filterKeys: FILTER_KEYS });
}
