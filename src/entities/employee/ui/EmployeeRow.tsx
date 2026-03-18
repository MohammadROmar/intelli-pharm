import { useTranslation } from 'react-i18next';

import type { Employee } from '../model/employeeTypes';
import { TableCell, TableRow, TableActions } from '@/shared/ui';

type EmployeeRowProps = {
  employee: Employee;
  onDelete: (employee: Employee) => void;
};

export function EmployeeRow({ employee, onDelete }: EmployeeRowProps) {
  const { t } = useTranslation('translation', {
    keyPrefix: 'employeesPage.roles',
  });

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
        <TableActions.Detail />
        <TableActions.Update />
        <TableActions.Delete />
      </TableActions>
    </TableRow>
  );
}
