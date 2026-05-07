import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Pencil, Trash2 } from 'lucide-react';

import { DeleteEmployeeModal } from '@/features/employee-delete';
import type { Employee } from '@/entities/employee';
import { ActionsDropdown, DropdownMenuItem, PageHeader } from '@/shared/ui';

type Props = { employee: Employee };

export function EmployeeDetailHeader({ employee }: Props) {
  const { t } = useTranslation('translation', {
    keyPrefix: 'medicinesPage.detail',
  });

  const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(
    null,
  );
  const navigate = useNavigate();

  return (
    <>
      <DeleteEmployeeModal
        employee={employeeToDelete}
        onClose={() => setEmployeeToDelete(null)}
        onDeleteSuccess={() => navigate('/dashboard/medicines')}
      />

      <PageHeader
        title={employee.name}
        pageTitle={`${employee.name} · ${t('pageTitle')} - IntelliPharma`}
      >
        <ActionsDropdown label={t('actions')}>
          <DropdownMenuItem asChild>
            <Link
              to={`/dashboard/employees/${employee.id}/edit`}
              className="cursor-pointer"
            >
              <Pencil className="size-4" />
              {t('edit')}
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem
            variant="destructive"
            onClick={() => setEmployeeToDelete(employee)}
            className="text-destructive hover:text-destructive hover:bg-destructive/20! w-full justify-start"
          >
            <Trash2 className="size-4" />
            {t('delete')}
          </DropdownMenuItem>
        </ActionsDropdown>
      </PageHeader>
    </>
  );
}
