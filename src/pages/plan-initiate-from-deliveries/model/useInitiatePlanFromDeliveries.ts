import { toast } from 'sonner';

import { useCreateEntity } from '@/shared/model';
import { apiClient } from '@/shared/api';

import type { toInitiatePlanFromDeliveriesPayload } from '../lib/utils';
import { useTranslation } from 'react-i18next';

type Payload = ReturnType<typeof toInitiatePlanFromDeliveriesPayload>;

function initiatePlanFromDeliveries(payload: Payload) {
  return apiClient.post('/planner/v1/plans/initiate-from-deliveries', payload);
}

export function useInitiatePlanFromDeliveries() {
  const { t } = useTranslation();
  const { t: tErrors } = useTranslation('errors');

  return useCreateEntity<Payload>({
    queryKey: 'plans',
    mutationFn: initiatePlanFromDeliveries,
    translationKey: 'plan',
    navigatePath: '/dashboard/plans',
    onError: ({ status, i18nKey }) => {
      toast.error(t(`toasts.create.error`), {
        description: tErrors(status === 400 ? 'noDeliveryTasks' : i18nKey),
      });
    },
  });
}
