import { MedicineRestockForm } from './MedicineRestockForm';
import { useRestockMedicine } from '../model/useRestockMedicine';

export function MedicineRestock({ id }: { id: number }) {
  const { mutate, isPending } = useRestockMedicine(id);

  return (
    <MedicineRestockForm
      onSubmit={mutate}
      isPending={isPending}
      onCancel={() => {}}
    />
  );
}
