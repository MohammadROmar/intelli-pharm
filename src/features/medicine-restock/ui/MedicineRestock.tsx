import { useState } from 'react';

import type { MedicineDetail } from '@/entities/medicine';

import { MedicineRestockForm } from './MedicineRestockForm';
import { toPayload } from '../lib/utils';
import { stocksToFormValues } from '../lib/stocksToFormValues';
import { useRestockMedicine } from '../model/useRestockMedicine';

export function MedicineRestock({ medicine }: { medicine: MedicineDetail }) {
  const [formKey, setFormKey] = useState(0);
  const { mutate, isPending } = useRestockMedicine(medicine.id);

  return (
    <MedicineRestockForm
      key={formKey}
      onSubmit={(payload) => mutate(toPayload(payload))}
      isPending={isPending}
      defaultValues={stocksToFormValues(medicine.stocks)}
      onReset={() => setFormKey((prev) => prev + 1)}
    />
  );
}
