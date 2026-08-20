import { memo, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { Check } from 'lucide-react';

import { cn } from '@/shared/lib';
import { Skeleton } from '@/shared/ui';

import type { Employee } from '../model/employeeTypes';

type Props = { employee: Employee; selected: boolean };

function EmployeeOptionRowImpl({ employee, selected }: Props) {
  return (
    <div className="flex w-full min-w-0 items-center gap-2.5">
      <Check
        aria-hidden
        className={cn(
          'size-4 shrink-0',
          selected ? 'opacity-100' : 'opacity-0',
        )}
      />

      <span className="flex min-w-0 flex-1 flex-col text-start">
        <span className="truncate text-sm font-medium">{employee.name}</span>
        <span className="text-muted-foreground flex items-center gap-0.5 truncate text-xs">
          <span>{employee.email} ·</span>
          <Suspense fallback={<Skeleton className="h-4 w-8 border" />}>
            <EmployeeRole roles={employee.roles} />
          </Suspense>
        </span>
      </span>
    </div>
  );
}

function EmployeeRole({ roles }: { roles: Employee['roles'] }) {
  const { t } = useTranslation('employees', { keyPrefix: 'roles' });

  const role = roles[0] ?? '—';

  return <span> {t(role, { defaultValue: role })}</span>;
}

export const EmployeeOptionRow = memo(EmployeeOptionRowImpl);
