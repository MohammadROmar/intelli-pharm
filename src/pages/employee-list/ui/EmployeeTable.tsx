import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { DeleteEmployeeModal } from '@/features/employee-delete';
import { hasPermission, useGrantedPermissions } from '@/entities/session';
import type { Employee, EmployeeListResponse } from '@/entities/employee';
import {
  TableHead,
  EntityListTable,
  EntityFiltersToolbar,
  EntityEmptyState,
} from '@/shared/ui';

import { EmployeeRow, type EmployeeRowActionAccess } from './EmployeeRow';
import { EmployeeFiltersModal } from './EmployeeFiltersModal';
import { useEmployeeFilters } from '../model/useEmployeeFilters';

export function EmployeeTable({ data }: { data: EmployeeListResponse }) {
  const { t } = useTranslation('employees');
  const grantedPermissions = useGrantedPermissions();

  const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(
    null,
  );

  const filtersState = useEmployeeFilters();

  const canCreate = hasPermission(grantedPermissions, 'erp.employees.create');
  const canView = hasPermission(grantedPermissions, 'erp.employees.view');
  const canUpdate = hasPermission(grantedPermissions, 'erp.employees.update');
  const canDeactivate = hasPermission(
    grantedPermissions,
    'erp.employees.deactivate',
  );

  const actionAccess = useMemo<EmployeeRowActionAccess>(
    () => ({
      canView,
      canUpdate,
      canDeactivate,
      hasAnyRowAction: canView || canUpdate || canDeactivate,
    }),
    [canDeactivate, canUpdate, canView],
  );

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
      {canDeactivate ? (
        <DeleteEmployeeModal
          employee={employeeToDelete}
          onClose={handleDeleteModalClose}
        />
      ) : null}

      <EntityListTable
        data={data}
        title={t('list.all')}
        addButton={
          canCreate
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
            {actionAccess.hasAnyRowAction ? (
              <TableHead>{t('list.actions')}</TableHead>
            ) : null}
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
