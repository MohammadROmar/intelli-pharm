import { MedicineRestockForm } from './MedicineRestockForm';
import { useMedicineRestock } from '../model/useMedicineRestock';

export function MedicineRestock({ id }: { id: number }) {
  const { mutate, isPending } = useMedicineRestock(id);

  return (
    <MedicineRestockForm
      onSubmit={mutate}
      isPending={isPending}
      onCancel={() => {}}
    />
  );
}
