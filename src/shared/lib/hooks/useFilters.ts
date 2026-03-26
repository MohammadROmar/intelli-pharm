import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

type Params<T> = {
  filters: Record<string, string | null | undefined>;
  filterKeys: (keyof T)[];
};

export function useFilters<T>({ filters, filterKeys }: Params<T>) {
  const [, setSearchParams] = useSearchParams();

  const applyFilters = useCallback(
    (newFilters: T) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          filterKeys.forEach((key) => {
            const value = newFilters[key];
            if (value !== undefined && value !== null && value !== '') {
              next.set(key.toString(), String(value));
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
    [setSearchParams, filterKeys],
  );

  const clearFilters = useCallback(() => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);

        for (const item of filterKeys) {
          next.delete(String(item));
        }

        return next;
      },
      { replace: false },
    );
  }, [setSearchParams, filterKeys]);

  const activeCount = Object.values(filters).filter(
    (v) => v !== undefined && v !== '',
  ).length;

  const hasActiveFilters = Object.values(filters).some(
    (v) => v !== undefined && v !== null && v !== '',
  );

  return { filters, applyFilters, clearFilters, activeCount, hasActiveFilters };
}
