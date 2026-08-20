import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Users } from 'lucide-react';

import { Button, GenericMultiSelect } from '@/shared/ui';

import { EmployeeOptionRow } from './EmployeeOptionRow';
import { useInfiniteEmployees } from '../model/useInfiniteEmployees';
import type { Employee, EmployeeRole } from '../model/employeeTypes';

const ROLE_FILTERS: (EmployeeRole | undefined)[] = [
  undefined,
  'rep',
  'distributor',
];

type EmployeeMultiSelectProps = {
  value: number[];
  onChange: (ids: number[]) => void;
  invalid?: boolean;
  disabled?: boolean;
};

export function EmployeeMultiSelect({
  value,
  onChange,
  invalid,
  disabled,
}: EmployeeMultiSelectProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [role, setRole] = useState<EmployeeRole | undefined>(undefined);

  const { entities, queryResult } = useInfiniteEmployees({ searchTerm, role });
  const { fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    queryResult;

  const { t } = useTranslation('employees', { keyPrefix: 'roles' });

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap gap-1.5">
        {ROLE_FILTERS.map((filterRole) => {
          const isActive = role === filterRole;
          return (
            <Button
              key={filterRole ?? 'all'}
              type="button"
              size="sm"
              variant={isActive ? 'default' : 'outline'}
              aria-pressed={isActive}
              onClick={() => setRole(filterRole)}
            >
              {t(filterRole ?? 'all')}
            </Button>
          );
        })}
      </div>

      <GenericMultiSelect<Employee>
        options={entities}
        valueKey="id"
        labelKey="name"
        value={value}
        onValueChange={(ids) => onChange(ids as number[])}
        onSearchChange={setSearchTerm}
        onLoadMore={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        isLoading={isLoading}
        invalid={invalid}
        disabled={disabled}
        icon={Users}
        renderOption={(employee, { isSelected }) => (
          <EmployeeOptionRow employee={employee} selected={isSelected} />
        )}
      />
    </div>
  );
}
