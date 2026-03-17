import { useTranslation } from 'react-i18next';
import type { Employee } from '../model/employeeTypes';
import { TableCell, TableRow, TableActions } from '@/shared/ui';
import { Info } from 'lucide-react';
import { buttonVariants } from '@/shared/lib';

type EmployeeRowProps = {
  employee: Employee;
  onDelete: (employee: Employee) => void;
};

export function EmployeeRow({ employee, onDelete }: EmployeeRowProps) {
  const { t } = useTranslation('translation', {
    keyPrefix: 'employeesPage.roles',
  });

  const isAdmin = employee.roles[0] === 'admin';

  return (
    <TableRow>
      <TableCell className="font-medium">{employee.id}</TableCell>
      <TableCell>{employee.name}</TableCell>
      <TableCell>{employee.email}</TableCell>
      <TableCell>{t(employee.roles[0])}</TableCell>

      <TableActions
        itemId={employee.id}
        item={employee}
        onDelete={onDelete}
        path="/dashboard/employees"
      >
        {isAdmin ? (
          <div
            className={buttonVariants({
              variant: 'ghost',
              size: 'sm',
              className: 'pointer-events-none opacity-50',
            })}
          >
            <Info className="size-4" />
          </div>
        ) : (
          <TableActions.Detail />
        )}
        <TableActions.Update />
        <TableActions.Delete />
      </TableActions>
    </TableRow>
  );
}
