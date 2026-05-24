import { useCreateEntity } from '@/shared/model';
import { apiClient } from '@/shared/api';

import type { toInitiatePlanPayload } from '../lib/utils';

type Payload = ReturnType<typeof toInitiatePlanPayload>;

function initiatePlan(payload: Payload) {
  return apiClient.post('/planner/v1/plans/initiate', payload);
}

export function useInitiatePlan() {
  return useCreateEntity<Payload>({
    queryKey: 'plans',
    mutationFn: initiatePlan,
    translationKey: 'plan',
  });
}
