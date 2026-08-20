import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Check } from 'lucide-react';

import { cn } from '@/shared/lib';

import type { Employee } from '../model/employeeTypes';

type EmployeeOptionRowProps = { employee: Employee; selected: boolean };

function EmployeeOptionRowImpl({ employee, selected }: EmployeeOptionRowProps) {
  const { t } = useTranslation('employees', { keyPrefix: 'roles' });

  const role = employee.roles[0] ?? '—';

  return (
    <div className="flex w-full min-w-0 items-center gap-2.5">
      <span className="flex min-w-0 flex-1 flex-col text-start">
        <span className="truncate text-sm font-medium">{employee.name}</span>
        <span className="text-muted-foreground truncate text-xs">
          {employee.email} · {t(role, { defaultValue: role })}
        </span>
      </span>

      <Check
        aria-hidden
        className={cn(
          'size-4 shrink-0 ltr:ml-2 rtl:mr-2',
          selected ? 'opacity-100' : 'opacity-0',
        )}
      />
    </div>
  );
}

export const EmployeeOptionRow = memo(EmployeeOptionRowImpl);
