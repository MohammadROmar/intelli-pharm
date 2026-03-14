import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { EmployeeRow, type Employee } from '@/entities/employee';
import { DeleteEmployeeModal } from '@/features/employee-delete';
import { dummyEmployees } from '@/entities/employee/model/dummyEmployees';
import {
  PageTitle,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCard,
} from '@/shared/ui';

export default function EmployeeListPage() {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page');

  const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(
    null,
  );

  const { t } = useTranslation('translation', {
    keyPrefix: 'employeesPage.list',
  });

  return (
    <>
      <DeleteEmployeeModal
        employee={employeeToDelete}
        onClose={() => setEmployeeToDelete(null)}
      />

      <PageTitle title={t('title')} subtitle={t('subtitle')} />

      <TableCard
        title={t('all')}
        basePath="/dashboard/employees"
        currentPage={+(page ?? 1)}
        maxPages={20}
        totalItems={200}
      >
        <TableHeader>
          <TableRow>
            <TableHead className="w-25">{t('id')}</TableHead>
            <TableHead>{t('name')}</TableHead>
            <TableHead>{t('email')}</TableHead>
            <TableHead>{t('role')}</TableHead>
            <TableHead>{t('actions')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dummyEmployees.map((employee) => (
            <EmployeeRow
              key={employee.id}
              employee={employee}
              onDelete={(employee) => {
                setEmployeeToDelete(employee);
              }}
            />
          ))}
        </TableBody>
      </TableCard>
    </>
  );
}
