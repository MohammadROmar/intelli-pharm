import { useState } from 'react';

import { MedicineRestockForm } from './MedicineRestockForm';
import { useRestockMedicine } from '../model/useRestockMedicine';
import { toPayload } from '../lib/utils';
import type { RestockFormValues } from '../model/restockTypes';

export function MedicineRestock({ id }: { id: number }) {
  const [formKey, setFormKey] = useState(0);
  const { mutate, isPending } = useRestockMedicine(id);

  function handleSubmit(values: RestockFormValues) {
    mutate(toPayload(values), {
      onSuccess: () => setFormKey((prev) => prev + 1),
    });
  }

  return (
    <MedicineRestockForm
      key={formKey}
      onSubmit={handleSubmit}
      isPending={isPending}
      onReset={() => setFormKey((prev) => prev + 1)}
    />
  );
}
