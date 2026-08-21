import { useTranslation } from 'react-i18next';

import type { Medicine } from './medicineTypes';
import { getInfiniteMedicines } from '../api';
import { useInfiniteEntities } from '@/shared/model';

export function useInfiniteMedicines(searchTerm: string) {
  const { i18n } = useTranslation();

  return useInfiniteEntities<Medicine>({
    queryKey: 'medicines',
    searchTerm,
    params: { queryLanguage: i18n.language },
    queryFn: getInfiniteMedicines,
  });
}
