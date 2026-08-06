import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useEmployeeAccess } from '@/features/employee-access';
import { DeleteEmployeeModal } from '@/features/employee-delete';
import type { Employee, EmployeeListResponse } from '@/entities/employee';
import {
  TableHead,
  EntityListTable,
  EntityFiltersToolbar,
  EntityEmptyState,
} from '@/shared/ui';

import { EmployeeRow } from './EmployeeRow';
import { EmployeeFiltersModal } from './EmployeeFiltersModal';
import { useEmployeeFilters } from '../model/useEmployeeFilters';

export function EmployeeTable({ data }: { data: EmployeeListResponse }) {
  const { t } = useTranslation('employees');

  const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(
    null,
  );

  const filtersState = useEmployeeFilters();

  const actionAccess = useEmployeeAccess();

  const handleDeleteModalClose = useCallback(() => {
    setEmployeeToDelete(null);
  }, []);

  const renderRow = useCallback(
    (employee: Employee) => (
      <EmployeeRow
        key={employee.id}
        employee={employee}
        actionAccess={actionAccess}
        onDelete={setEmployeeToDelete}
      />
    ),
    [actionAccess],
  );

  return (
    <>
      {actionAccess.canDeactivate ? (
        <DeleteEmployeeModal
          employee={employeeToDelete}
          onClose={handleDeleteModalClose}
        />
      ) : null}

      <EntityListTable
        data={data}
        title={t('list.all')}
        addButton={
          actionAccess.canCreate
            ? {
                addHref: '/dashboard/employees/new',
                addLabel: t('list.add'),
              }
            : undefined
        }
        basePath="/dashboard/employees"
        toolbar={
          <EntityFiltersToolbar
            filtersState={filtersState}
            FiltersModal={EmployeeFiltersModal}
          />
        }
        columns={
          <>
            <TableHead>{t('list.name')}</TableHead>
            <TableHead>{t('list.email')}</TableHead>
            <TableHead>{t('list.role')}</TableHead>
            <TableHead>{t('list.status')}</TableHead>
            <TableHead>{t('list.actions')}</TableHead>
          </>
        }
        renderRow={renderRow}
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
