import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Pencil, Trash2 } from 'lucide-react';

import { useEmployeeAccess } from '@/features/employee-access';
import { DeleteEmployeeModal } from '@/features/employee-delete';
import type { Employee } from '@/entities/employee';
import { ActionsDropdown, DropdownMenuItem, PageHeader } from '@/shared/ui';

type Props = { employee: Employee };

export function EmployeeDetailHeader({ employee }: Props) {
  const { t } = useTranslation('employees', { keyPrefix: 'detail' });

  const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(
    null,
  );
  const navigate = useNavigate();

  const { canDeactivate, canUpdate } = useEmployeeAccess();
  const hasAnyAction = canUpdate || canDeactivate;

  return (
    <>
      {canDeactivate && (
        <DeleteEmployeeModal
          employee={employeeToDelete}
          onClose={() => setEmployeeToDelete(null)}
          onDeleteSuccess={() => navigate('/dashboard/employees')}
        />
      )}

      <PageHeader
        title={employee.name}
        pageTitle={`${employee.name} · ${t('pageTitle')} - IntelliPharma`}
      >
        {hasAnyAction && (
          <ActionsDropdown label={t('employeeActions')}>
            {canUpdate && (
              <DropdownMenuItem asChild>
                <Link
                  to={`/dashboard/employees/${employee.id}/edit`}
                  className="cursor-pointer"
                >
                  <Pencil className="size-4" />
                  {t('edit')}
                </Link>
              </DropdownMenuItem>
            )}

            {canDeactivate && (
              <DropdownMenuItem
                variant="destructive"
                onSelect={() => setEmployeeToDelete(employee)}
                className="text-destructive hover:text-destructive hover:bg-destructive/20! w-full justify-start"
              >
                <Trash2 className="size-4" />
                {t('delete')}
              </DropdownMenuItem>
            )}
          </ActionsDropdown>
        )}
      </PageHeader>
    </>
  );
}
