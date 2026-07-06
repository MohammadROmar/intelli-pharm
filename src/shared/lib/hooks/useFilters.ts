import { useCallback, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';

import { serializeFilters } from '../filters';

type Params<T> = {
  filters: Record<string, unknown>;
  filterKeys: readonly (keyof T)[];
};

export function useFilters<T>({ filters, filterKeys }: Params<T>) {
  const [, setSearchParams] = useSearchParams();

  const filterKeysRef = useRef(filterKeys);
  useEffect(() => {
    filterKeysRef.current = filterKeys;
  }, [filterKeys]);

  const applyFilters = useCallback(
    (newFilters: T) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          const keys = filterKeysRef.current;

          const serializedFilters = serializeFilters(
            Object.fromEntries(
              keys.map((key) => [key.toString(), newFilters[key]]),
            ),
          );

          keys.forEach((key) => {
            const value = serializedFilters[key.toString()];

            if (value !== undefined && value !== '') {
              next.set(key.toString(), value);
            } else {
              next.delete(key.toString());
            }
          });
          next.delete('page');
          return next;
        },
        { replace: false },
      );
    },
    [setSearchParams],
  );

  const clearFilters = useCallback(() => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        filterKeysRef.current.forEach((key) => next.delete(key.toString()));
        next.delete('page');
        return next;
      },
      { replace: false },
    );
  }, [setSearchParams]);

  const activeCount = Object.entries(filters).filter(
    ([k, v]) =>
      k !== 'page' &&
      k !== 'per_page' &&
      v !== undefined &&
      v !== null &&
      v !== '',
  ).length;

  const hasActiveFilters = activeCount !== 0;

  return { filters, applyFilters, clearFilters, activeCount, hasActiveFilters };
}
