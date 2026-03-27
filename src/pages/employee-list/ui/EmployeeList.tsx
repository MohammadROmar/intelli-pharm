import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { EmployeeFiltersModal } from './EmployeeFiltersModal';
import { useEmployeeFilters } from '../model/useEmployeeFilters';
import { DeleteEmployeeModal } from '@/features/employee-delete';
import {
  EmployeeRow,
  type Employee,
  type EmployeeListResponse,
} from '@/entities/employee';
import {
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCard,
  FiltersTrigger,
  TableEmptyState,
} from '@/shared/ui';

export function EmployeeList({ data }: { data: EmployeeListResponse }) {
  const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(
    null,
  );

  const { t } = useTranslation('translation', {
    keyPrefix: 'employeesPage',
  });

  const employees = data.data;

  return (
    <>
      <DeleteEmployeeModal
        employee={employeeToDelete}
        onClose={() => setEmployeeToDelete(null)}
      />

      <TableCard
        title={t('list.all')}
        header={<Filters />}
        headerClassName="flex-row"
        basePath="/dashboard/employees"
        itemsPerPage={data.meta.per_page}
        currentPage={data.meta.current_page}
        totalItems={data.meta.total}
      >
        {employees.length > 0 ? (
          <>
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
              {employees.map((employee) => (
                <EmployeeRow
                  key={employee.id}
                  employee={employee}
                  onDelete={setEmployeeToDelete}
                />
              ))}
            </TableBody>
          </>
        ) : (
          <EmptyState />
        )}
      </TableCard>
    </>
  );
}

function Filters() {
  const [filtersOpen, setFiltersOpen] = useState(false);

  const { filters, applyFilters, clearFilters, activeCount, hasActiveFilters } =
    useEmployeeFilters();

  return (
    <>
      <FiltersTrigger
        onClick={() => setFiltersOpen(true)}
        activeCount={activeCount}
      />
      <EmployeeFiltersModal
        open={filtersOpen}
        onOpenChange={setFiltersOpen}
        hasActiveFilters={hasActiveFilters}
        defaultValues={filters}
        onApply={(values) => {
          applyFilters(values);
          setFiltersOpen(false);
        }}
        onClear={() => {
          clearFilters();
          setFiltersOpen(false);
        }}
      />
    </>
  );
}

function EmptyState() {
  const { hasActiveFilters, clearFilters } = useEmployeeFilters();

  return (
    <TableEmptyState
      variant={hasActiveFilters ? 'search' : 'empty'}
      onClearSearch={clearFilters}
    />
  );
}
