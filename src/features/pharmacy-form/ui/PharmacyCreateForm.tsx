import { useState } from 'react';

import { useHasPermission } from '@/entities/session';
import type { PharmacyDetail } from '@/entities/pharmacy';

import { PharmacyForm } from './PharmacyForm';
import { useCreatePharmacy } from '../model/useCreatePharmacy';

export function PharmacyCreateForm() {
  const [formKey, setFormKey] = useState(0);
  const { mutate, isPending } = useCreatePharmacy();

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
      canViewRegions={canViewRegions}
      onReset={() => setFormKey((prev) => prev + 1)}
    />
  );
}
