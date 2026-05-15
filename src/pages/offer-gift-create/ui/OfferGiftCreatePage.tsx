import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { CreateGiftsOfferForm, useCreateOffer } from '@/features/offer-create';
import { PageTitle } from '@/shared/ui';

export default function OfferGiftCreatePage() {
  const [formKey, setFormKey] = useState(0);

  const { mutate, isPending } = useCreateOffer();

  const { t } = useTranslation('offers', { keyPrefix: 'form.gifts' });

  return (
    <>
      <PageTitle title={t('title')} subtitle={t('subtitle')} />
      <CreateGiftsOfferForm
        key={formKey}
        isPending={isPending}
        onSubmit={mutate}
        onReset={() => setFormKey((p) => p + 1)}
      />
    </>
  );
}
