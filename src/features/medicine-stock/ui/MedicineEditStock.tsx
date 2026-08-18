import { useState } from 'react';

import type { MedicineDetail } from '@/entities/medicine';

import { MedicineUpdateStockForm } from './MedicineUpdateStockForm';
import { toPayload } from '../lib/utils';
import { stocksToFormValues } from '../lib/stocksToFormValues';
import { useEditMedicineStock } from '../model/useEditMedicineStock';

export function MedicineEditStock({ medicine }: { medicine: MedicineDetail }) {
  const [formKey, setFormKey] = useState(0);
  const { mutate, isPending } = useEditMedicineStock(medicine.id);

  return (
    <MedicineUpdateStockForm
      key={formKey}
      onSubmit={(payload) => mutate(toPayload(payload))}
      isPending={isPending}
      defaultValues={stocksToFormValues(medicine.stocks)}
      onReset={() => setFormKey((prev) => prev + 1)}
    />
  );
}
