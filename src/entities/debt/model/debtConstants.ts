import type { DebtStatus } from './debtTypes';

export const DEBT_STATUSES = [
  'pending',
  'unpaid',
  'partially_paid',
  'paid',
  'overdue',
] as const satisfies readonly DebtStatus[];

export function isDebtStatus(value: unknown): value is DebtStatus {
  return (
    typeof value === 'string' &&
    DEBT_STATUSES.some((status) => status === value)
  );
}
