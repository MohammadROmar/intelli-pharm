import { useState } from 'react';

import { MedicineRestockForm } from './MedicineRestockForm';
import { toPayload } from '../lib/utils';
import { useRestockMedicine } from '../model/useRestockMedicine';

export function MedicineRestock({ id }: { id: number }) {
  const [formKey, setFormKey] = useState(0);
  const { mutate, isPending } = useRestockMedicine(id);

  return (
    <MedicineRestockForm
      key={formKey}
      onSubmit={(payload) => mutate(toPayload(payload))}
      isPending={isPending}
      onReset={() => setFormKey((prev) => prev + 1)}
    />
  );
}
