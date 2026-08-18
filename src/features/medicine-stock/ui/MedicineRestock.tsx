import { useState } from 'react';

import type { MedicineDetail } from '@/entities/medicine';

import { MedicineUpdateStockForm } from './MedicineUpdateStockForm';
import { toPayload } from '../lib/utils';
import { useRestockMedicine } from '../model/useRestockMedicine';

export function MedicineRestock({ medicine }: { medicine: MedicineDetail }) {
  const [formKey, setFormKey] = useState(0);
  const { mutate, isPending } = useRestockMedicine(medicine.id);

  return (
    <MedicineUpdateStockForm
      key={formKey}
      onSubmit={(payload) => mutate(toPayload(payload))}
      isPending={isPending}
      onReset={() => setFormKey((prev) => prev + 1)}
    />
  );
}
