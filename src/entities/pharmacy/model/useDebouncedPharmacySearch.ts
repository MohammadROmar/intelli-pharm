import { useEffect, useState } from 'react';

const PHARMACY_SEARCH_DELAY_MS = 300;

export function useDebouncedPharmacySearch(value: string): string {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedValue(value.trim());
    }, PHARMACY_SEARCH_DELAY_MS);

    return () => window.clearTimeout(timeoutId);
  }, [value]);

  return debouncedValue;
}
