import { useState } from 'react';

import { usePharmacyMetricsFilters } from '../model/usePharmacyMetricsFilters';
import { PharmacySelector } from '@/entities/pharmacy';

type Props = { placeholder: string };

export function PharmacyMetricsSelector({ placeholder }: Props) {
  const { applyFilters, clearFilters } = usePharmacyMetricsFilters();
  const [pharmacy, setPharmacy] = useState<string | number | null>(null);

  function handlePharmacyChange(v: string | number | null) {
    setPharmacy(v);

    if (v === null) {
      clearFilters();
      return;
    }

    applyFilters({ pharmacy_id: v });
  }

  return (
    <PharmacySelector
      value={pharmacy}
      onValueChange={handlePharmacyChange}
      placeholder={placeholder}
    />
  );
}
