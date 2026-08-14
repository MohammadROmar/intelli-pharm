import { useState } from 'react';

import { useHasPermission } from '@/entities/session';
import type { PharmacyDetail } from '@/entities/pharmacy';

import { PharmacyForm } from './PharmacyForm';
import { useEditPharmacy } from '../model/useEditPharmacy';

type Props = { pharmacy: PharmacyDetail };

export function PharmacyEditForm({ pharmacy }: Props) {
  const [formKey, setFormKey] = useState(0);
  const { mutate, isPending } = useEditPharmacy(pharmacy.id);

  const canViewRegions = useHasPermission('erp.regions.view');

  function handleSubmit(payload: PharmacyDetail) {
    mutate(payload, {
      onSuccess: () => setFormKey((prev) => prev + 1),
    });
  }

  return (
    <PharmacyForm
      key={formKey}
      isPending={isPending}
      onSubmit={handleSubmit}
      defaultValues={pharmacy}
      canViewRegions={canViewRegions}
      onReset={() => setFormKey((prev) => prev + 1)}
    />
  );
}
