import { MedicineRestock } from '@/features/medicine-restock';
import { useGetMedicine } from '@/entities/medicine';
import { FormSkeleton, QueryError } from '@/shared/ui';

export default function MedicineRestockPage() {
  const { isLoading, data, isError, error } = useGetMedicine();

  if (isError) {
    return <QueryError error={error} />;
  }

  if (isLoading || !data) {
    return <FormSkeleton fields={3} />;
  }

  return <MedicineRestock id={data.data!.id} />;
}
