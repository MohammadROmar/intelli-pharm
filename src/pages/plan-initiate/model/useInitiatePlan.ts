import { initiateRepPlan } from '@/entities/plan';
import { usePlanGenerationMutation } from '@/features/plan-generation';

import type { toInitiatePlanPayload } from '../lib/utils';

type Payload = ReturnType<typeof toInitiatePlanPayload>;

export function useInitiatePlan() {
  return usePlanGenerationMutation<Payload>({
    initiate: initiateRepPlan,
  });
}
