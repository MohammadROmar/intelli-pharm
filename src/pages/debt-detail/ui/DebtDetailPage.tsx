import { useParams } from 'react-router';
import { useTranslation } from 'react-i18next';

import { QueryDisabled, QueryErrorBoundary } from '@/shared/ui';

import { DebtContextCard } from './DebtContextCard';
import { DebtDetailHeader } from './DebtDetailHeader';
import { DebtOrders } from './DebtOrders';
import { DebtPayments } from './DebtPayments';
import { DebtSummaryStrip } from './DebtSummaryStrip';
import { useDebtDetailAccess } from '../model/useDebtDetailAccess';
import { useGetDebtSuspense } from '../model/useGetDebtSuspense';

export default function DebtDetailPage() {
  const { id } = useParams<{ id: string }>();
  const debtId = Number(id);

  if (!id || Number.isNaN(debtId)) {
    return <QueryDisabled path="/dashboard/debts" />;
  }

  return (
    <QueryErrorBoundary>
      <DebtDetailContent debtId={debtId} />
    </QueryErrorBoundary>
  );
}

type DebtDetailContentProps = { debtId: number };

function DebtDetailContent({ debtId }: DebtDetailContentProps) {
  const { t } = useTranslation('debt-detail', { keyPrefix: 'detail' });
  const { data } = useGetDebtSuspense(debtId);
  const access = useDebtDetailAccess();
  const debt = data.data;

  if (!debt) {
    throw new Error('Debt response did not include debt data.');
  }

  const debtCode = `DBT-${String(debt.id).padStart(6, '0')}`;

  return (
    <>
      <title>{`${debtCode} · ${t('pageTitle')} - IntelliPharm`}</title>

      <div className="space-y-5 pb-8">
        <DebtDetailHeader debt={debt} />
        <DebtSummaryStrip debt={debt} />

        <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_22rem] xl:items-start">
          <main className="min-w-0 space-y-5 xl:col-start-1 xl:row-start-1">
            <DebtPayments
              payments={debt.payments}
              canViewEmployee={access.canViewEmployee}
            />
            <DebtOrders
              orders={debt.orders}
              canViewOffer={access.canViewOffer}
              canViewOrder={access.canViewOrder}
            />
          </main>

          <aside className="xl:col-start-2 xl:row-start-1">
            <DebtContextCard
              debt={debt}
              canViewPharmacy={access.canViewPharmacy}
            />
          </aside>
        </div>
      </div>
    </>
  );
}
