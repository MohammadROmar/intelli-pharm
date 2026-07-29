import { useParams } from 'react-router';

import { EmployeeInfoCard } from './EmployeeInfoCard';
import { EmployeeDetailHeader } from './EmployeeDetailHeader';
import { EmployeePermissionsCard } from './EmployeePermissionsCard';
import { useGetEmployeeSuspense } from '@/entities/employee';
import { QueryErrorBoundary, QueryDisabled } from '@/shared/ui';

export default function EmployeeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const employeeId = Number(id);

  if (!id || Number.isNaN(employeeId)) {
    return <QueryDisabled isEdit path="/dashboard/employees" />;
  }

  return (
    <QueryErrorBoundary>
      <EmployeeDetailContent employeeId={employeeId} />
    </QueryErrorBoundary>
  );
}

type EmployeeDetailContentProps = { employeeId: number };

function EmployeeDetailContent({ employeeId }: EmployeeDetailContentProps) {
  const { data } = useGetEmployeeSuspense(employeeId);

  const employee = data.data!;

  return (
    <div className="space-y-6">
      <EmployeeDetailHeader employee={employee} />
      <EmployeeInfoCard employee={employee} />
      <EmployeePermissionsCard permissions={employee.permissions} />
    </div>
  );
}
