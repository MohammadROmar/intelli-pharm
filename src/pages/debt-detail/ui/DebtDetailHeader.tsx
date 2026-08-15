import { useTranslation } from 'react-i18next';
import { HandCoins } from 'lucide-react';

import { DebtStatusBadge, type DebtDetail } from '@/entities/debt';

type Props = { debt: DebtDetail };

export function DebtDetailHeader({ debt }: Props) {
  const { t } = useTranslation('debt-detail', {
    keyPrefix: 'detail.header',
  });

  const debtCode = `DBT-${String(debt.id).padStart(6, '0')}`;

  return (
    <header className="bg-card relative overflow-hidden rounded-2xl border p-5 shadow-sm sm:p-6">
      <div
        className="bg-primary/5 pointer-events-none absolute -end-12 -top-16 size-40 rounded-full"
        aria-hidden="true"
      />

      <div className="flex min-w-0 items-start gap-4">
        <div className="bg-primary/10 text-primary hidden size-12 shrink-0 items-center justify-center rounded-xl border sm:flex">
          <HandCoins className="size-6" aria-hidden="true" />
        </div>

        <div className="min-w-0 space-y-3">
          <div>
            <p className="text-muted-foreground mb-1 text-xs font-semibold tracking-[0.16em] uppercase">
              {t('recordLabel')}
            </p>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              {debtCode}
            </h1>
            <p className="text-muted-foreground mt-1 text-sm">
              {t('pharmacyContext', { pharmacy: debt.pharmacy_name })}
            </p>
          </div>

          <DebtStatusBadge status={debt.status} />
        </div>
      </div>
    </header>
  );
}
