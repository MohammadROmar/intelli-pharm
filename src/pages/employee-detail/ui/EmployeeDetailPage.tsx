import { EmployeeInfoCard } from './EmployeeInfoCard';
import { EmployeeDetailHeader } from './EmployeeDetailHeader';
import { EmployeePermissionsCard } from './EmployeePermissionsCard';
import { useGetEmployee } from '@/entities/employee';
import { DetailSkeleton, QueryDisabled, QueryError } from '@/shared/ui';

export default function EmployeeDetailPage() {
  const { data, isLoading, isEnabled, isError, error, refetch } =
    useGetEmployee();

  if (!isEnabled) {
    return <QueryDisabled isEdit path="/dashboard/categories" />;
  }

  if (isError) {
    return <QueryError error={error} onRetry={refetch} />;
  }

  if (!data || isLoading) {
    return <DetailSkeleton cards={[{ rows: 4 }, { rows: 2 }]} tables={0} />;
  }

  const employee = data.data!;

  return (
    <div className="space-y-6">
      <EmployeeDetailHeader employee={employee} />
      <EmployeeInfoCard employee={employee} />
      <EmployeePermissionsCard permissions={employee.permissions} />
    </div>
  );
}
