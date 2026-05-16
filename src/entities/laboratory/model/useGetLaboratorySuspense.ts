import type { LaboratoryDetail } from './laboratoryTypes';
import { useSuspenseGetEntityById } from '@/shared/model';

export function useGetLaboratorySuspense(id: number) {
  return useSuspenseGetEntityById<LaboratoryDetail>({
    id,
    queryKey: 'laboratories',
    endpoint: '/erp/v1/laboratories',
    withDualLanguage: true,
  });
}
