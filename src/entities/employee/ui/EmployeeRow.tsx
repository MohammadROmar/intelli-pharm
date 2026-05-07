import { useTranslation } from 'react-i18next';

import type { Employee } from '../model/employeeTypes';
import { TableCell, TableRow, TableActions, Badge } from '@/shared/ui';

type EmployeeRowProps = {
  employee: Employee;
  onDelete: (employee: Employee) => void;
};

export function EmployeeRow({ employee, onDelete }: EmployeeRowProps) {
  const { t } = useTranslation('translation', {
    keyPrefix: 'employeesPage',
  });

  return (
    <TableRow>
      <TableCell className="text-muted-foreground text-xs">
        {employee.id}
      </TableCell>
      <TableCell>
        <p className="max-w-[20ch] truncate font-medium">{employee.name}</p>
      </TableCell>
      <TableCell className="font-mono">{employee.email}</TableCell>
      <TableCell>{t(`roles.${employee.roles[0]}`)}</TableCell>
      <TableCell>
        <Badge variant={employee.is_active ? 'success' : 'muted'}>
          {employee.is_active ? t('list.active') : t('list.inactive')}
        </Badge>
      </TableCell>

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
