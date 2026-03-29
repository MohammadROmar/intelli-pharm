import { getEmployeeById, type Employee } from '@/entities/employee';
import { useGetEntityById } from '@/shared/model';

export function useGetEmployee() {
  return useGetEntityById<Employee>({
    queryKey: 'employees',
    fetchFn: getEmployeeById,
  });
}
