import { useTranslation } from 'react-i18next';

import { initiateDeliveryPlan } from '@/entities/plan';
import { usePlanGenerationMutation } from '@/features/plan-generation';

import type { toInitiatePlanFromDeliveriesPayload } from '../lib/utils';

type Payload = ReturnType<typeof toInitiatePlanFromDeliveriesPayload>;

const NO_DELIVERY_TASKS_MESSAGE = 'No delivery tasks found for today.';

export function useInitiatePlanFromDeliveries() {
  const { t: tErrors } = useTranslation('errors');

  return usePlanGenerationMutation<Payload>({
    initiate: initiateDeliveryPlan,

    mapGenerationError: (error) =>
      tErrors(
        error.message === NO_DELIVERY_TASKS_MESSAGE
          ? 'noDeliveryTasks'
          : 'unknown',
      ),
  });
}
