import { useTranslation } from 'react-i18next';

import type { Pharmacy } from './pharmacyTypes';
import { getInfinitePharmacies } from '../api';
import { useInfiniteEntities } from '@/shared/model';

export function useInfinitePharmacies(
  searchTerm: string,
  params?: Record<string, unknown>,
) {
  const { i18n } = useTranslation();

  return useInfiniteEntities<Pharmacy>({
    queryKey: 'pharmacies',
    searchTerm,
    params: { ...params, queryLanguage: i18n.language },
    queryFn: getInfinitePharmacies,
  });
}
