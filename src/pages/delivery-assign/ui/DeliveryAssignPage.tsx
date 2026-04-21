import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  AssignDeliveryForm,
  useAssignDelivery,
} from '@/features/delivery-assign';
import { PageTitle } from '@/shared/ui';
import type { AssignDeliveryPayload } from '@/entities/delivery';

export default function DeliveryAssignPage() {
  const [formKey, setFormKey] = useState(0);
  const { mutate, isPending } = useAssignDelivery();

  const { t } = useTranslation('translation', {
    keyPrefix: 'deliveriesPage.form',
  });

  function handleSubmit(payload: AssignDeliveryPayload) {
    mutate(payload, { onSuccess: () => setFormKey((prev) => prev + 1) });
  }

  return (
    <>
      <PageTitle title={t('title')} subtitle={t('subtitle')} />
      <AssignDeliveryForm
        key={formKey}
        isPending={isPending}
        onSubmit={handleSubmit}
        onReset={() => setFormKey((prev) => prev + 1)}
      />
    </>
  );
}
