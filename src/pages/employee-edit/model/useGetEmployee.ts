import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { getEmployee } from '@/entities/employee';
import type { Employee } from '@/entities/employee';
import type { ApiError, ApiResponse } from '@/shared/api';

export function useGetEmployee() {
  const { id } = useParams();

  const employeeId = Number(id);
  const isValidId = !isNaN(employeeId);

  return useQuery<ApiResponse<Employee>, ApiError>({
    queryKey: ['employees', `id-${id}`],
    queryFn: () => getEmployee(employeeId),
    enabled: isValidId,
  });
}
