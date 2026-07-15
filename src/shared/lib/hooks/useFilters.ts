import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

import { serializeFilters, type FilterParams } from '../filters';
import { useLatestRef } from './useLatestRef';

type Params<T extends FilterParams> = {
  filters: Partial<T>;
  filterKeys: readonly (keyof T)[];
};

export function useFilters<T extends FilterParams>({
  filters,
  filterKeys,
}: Params<T>) {
  const [, setSearchParams] = useSearchParams();

  const filterKeysRef = useLatestRef(filterKeys);

  const applyFilters = useCallback(
    (newFilters: T) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          const keys = filterKeysRef.current;

          const serializedFilters = serializeFilters(
            Object.fromEntries(
              keys.map((key: keyof T) => [key.toString(), newFilters[key]]),
            ),
          );

          keys.forEach((key: keyof T) => {
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
    [setSearchParams, filterKeysRef],
  );

  const clearFilters = useCallback(() => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        filterKeysRef.current.forEach((key: keyof T) =>
          next.delete(key.toString()),
        );
        next.delete('page');
        return next;
      },
      { replace: false },
    );
  }, [setSearchParams, filterKeysRef]);

  const activeCount = filterKeys.filter((key: keyof T) => {
    const value = filters[key];
    return value !== undefined && value !== null && value !== '';
  }).length;

  const hasActiveFilters = activeCount !== 0;

  return { filters, applyFilters, clearFilters, activeCount, hasActiveFilters };
}
