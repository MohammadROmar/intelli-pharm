import { useTranslation } from 'react-i18next';
import { useState } from 'react';

import {
  EmployeeRow,
  type Employee,
  type EmployeeListResponse,
} from '@/entities/employee';
import { DeleteEmployeeModal } from '@/features/employee-delete';
import {
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCard,
  TableCardHeader,
} from '@/shared/ui';

export function EmployeeList({ data }: { data: EmployeeListResponse }) {
  const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(
    null,
  );

  const { t } = useTranslation('translation', {
    keyPrefix: 'employeesPage',
  });

  return (
    <>
      <DeleteEmployeeModal
        employee={employeeToDelete}
        onClose={() => setEmployeeToDelete(null)}
      />

      <TableCard
        title={t('list.all')}
        header={
          <TableCardHeader
            createText={t('create.title')}
            placeholder={t('list.searchPlaceholder')}
            basePath="/dashboard/employees"
          />
        }
        basePath="/dashboard/employees"
        itemsPerPage={data.meta.per_page}
        currentPage={data.meta.current_page}
        totalItems={data.meta.total}
      >
        <TableHeader>
          <TableRow>
            <TableHead className="w-25">{t('list.id')}</TableHead>
            <TableHead>{t('list.name')}</TableHead>
            <TableHead>{t('list.email')}</TableHead>
            <TableHead>{t('list.role')}</TableHead>
            <TableHead>{t('list.actions')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.data.map((employee) => (
            <EmployeeRow
              key={employee.id}
              employee={employee}
              onDelete={setEmployeeToDelete}
            />
          ))}
        </TableBody>
      </TableCard>
    </>
  );
}
