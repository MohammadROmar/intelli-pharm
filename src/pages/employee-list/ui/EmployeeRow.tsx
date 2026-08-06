import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import type { Employee } from '@/entities/employee';
import { TableCell, TableRow, TableActions, Badge } from '@/shared/ui';

type EmployeeRowActionAccess = Readonly<{
  canUpdate: boolean;
  canDeactivate: boolean;
}>;

type EmployeeRowProps = {
  employee: Employee;
  actionAccess: EmployeeRowActionAccess;
  onDelete: (employee: Employee) => void;
};

export const EmployeeRow = memo(function EmployeeRow({
  employee,
  actionAccess,
  onDelete,
}: EmployeeRowProps) {
  const { t } = useTranslation('employees');

  const role = employee.roles[0];

  return (
    <TableRow>
      <TableCell>
        <p className="max-w-[20ch] truncate font-medium">{employee.name}</p>
      </TableCell>
      <TableCell className="font-mono">{employee.email}</TableCell>
      <TableCell>{t(`roles.${role}`, role)}</TableCell>
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
        {actionAccess.canUpdate ? <TableActions.Update /> : null}
        {actionAccess.canDeactivate ? <TableActions.Delete /> : null}
      </TableActions>
    </TableRow>
  );
});
