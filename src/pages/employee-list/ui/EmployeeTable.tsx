import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { DeleteEmployeeModal } from '@/features/employee-delete';
import {
  EmployeeRow,
  type Employee,
  type EmployeeListResponse,
} from '@/entities/employee';
import {
  TableHead,
  EntityListTable,
  EntityFiltersToolbar,
  EntityEmptyState,
} from '@/shared/ui';

import { EmployeeFiltersModal } from './EmployeeFiltersModal';
import { useEmployeeFilters } from '../model/useEmployeeFilters';

export function EmployeeTable({ data }: { data: EmployeeListResponse }) {
  const { t } = useTranslation('employees');

  const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(
    null,
  );

  const filtersState = useEmployeeFilters();

  return (
    <>
      <DeleteEmployeeModal
        employee={employeeToDelete}
        onClose={() => setEmployeeToDelete(null)}
      />

      <EntityListTable
        data={data}
        title={t('list.all')}
        addHref="/dashboard/employees/new"
        addLabel={t('list.add')}
        basePath="/dashboard/employees"
        toolbar={
          <EntityFiltersToolbar
            filtersState={filtersState}
            FiltersModal={EmployeeFiltersModal}
          />
        }
        columns={
          <>
            <TableHead className="w-25">{t('list.id')}</TableHead>
            <TableHead>{t('list.name')}</TableHead>
            <TableHead>{t('list.email')}</TableHead>
            <TableHead>{t('list.role')}</TableHead>
            <TableHead>{t('list.status')}</TableHead>
            <TableHead>{t('list.actions')}</TableHead>
          </>
        }
        renderRow={(employee) => (
          <EmployeeRow
            key={employee.id}
            employee={employee}
            onDelete={setEmployeeToDelete}
          />
        )}
        emptyState={
          <EntityEmptyState
            hasActiveFilters={filtersState.hasActiveFilters}
            clearFilters={filtersState.clearFilters}
          />
        }
      />
    </>
  );
}
