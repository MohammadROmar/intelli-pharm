import { useCallback } from 'react';
import { useSearchParams } from 'react-router';

export const PER_PAGE_OPTIONS = [10, 25, 50, 100] as const;
export type PerPageOption = (typeof PER_PAGE_OPTIONS)[number];

export const DEFAULT_PER_PAGE: PerPageOption = 10;

type UsePerPageReturn = {
  perPage: PerPageOption;
  setPerPage: (value: PerPageOption) => void;
};

export function usePerPage(): UsePerPageReturn {
  const [searchParams, setSearchParams] = useSearchParams();

  const raw = Number(searchParams.get('per_page'));

  const perPage: PerPageOption = (
    PER_PAGE_OPTIONS as readonly number[]
  ).includes(raw)
    ? (raw as PerPageOption)
    : DEFAULT_PER_PAGE;

  const setPerPage = useCallback(
    (value: PerPageOption) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          next.set('per_page', String(value));
          next.delete('page');
          return next;
        },
        { replace: false },
      );
    },
    [setSearchParams],
  );

  return { perPage, setPerPage };
}
