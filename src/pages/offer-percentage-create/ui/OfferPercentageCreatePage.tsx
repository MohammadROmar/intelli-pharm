import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  CreatePercentageOfferForm,
  useCreateOffer,
} from '@/features/offer-create';
import { PageTitle } from '@/shared/ui';

export default function OfferPercentageCreatePage() {
  const [formKey, setFormKey] = useState(0);

  const { mutate, isPending } = useCreateOffer();

  const { t } = useTranslation('translation', {
    keyPrefix: 'offersPage.form.percentage',
  });

  return (
    <>
      <PageTitle title={t('title')} subtitle={t('subtitle')} />
      <CreatePercentageOfferForm
        key={formKey}
        isPending={isPending}
        onSubmit={mutate}
        onReset={() => setFormKey((p) => p + 1)}
      />
    </>
  );
}
