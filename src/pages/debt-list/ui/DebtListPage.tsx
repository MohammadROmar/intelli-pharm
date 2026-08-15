import { useTranslation } from 'react-i18next';
import { SearchX } from 'lucide-react';

import { DebtCard } from './DebtCard';
import { DebtFiltersBar } from './DebtFiltersBar';
import { DebtPortfolioSummary } from './DebtPortfolioSummary';
import { useDebtFilters } from '../model/useDebtFilters';
import { useGetDebtsSuspense } from '../model/useGetDebtsSuspense';
import { Button, PageTitle, QueryErrorBoundary } from '@/shared/ui';

export default function DebtListPage() {
  return (
    <QueryErrorBoundary>
      <DebtListContent />
    </QueryErrorBoundary>
  );
}

function DebtListContent() {
  const { t } = useTranslation('debts', { keyPrefix: 'list' });
  const { data } = useGetDebtsSuspense();
  const filterState = useDebtFilters();
  const payload = data.data;

  if (!payload) {
    throw new Error('Debt list response did not include debt data.');
  }

  return (
    <>
      <title>{`${t('pageTitle')} - IntelliPharm`}</title>

      <div className="space-y-5 pb-8">
        <PageTitle title={t('title')} subtitle={t('subtitle')} />
        <DebtPortfolioSummary summary={payload.summary} />
        <DebtFiltersBar {...filterState} />

        <section aria-labelledby="debt-records-title" className="space-y-4">
          {payload.debts.length > 0 ? (
            <div className="grid gap-4 xl:grid-cols-2">
              {payload.debts.map((debt) => (
                <DebtCard key={debt.id} debt={debt} />
              ))}
            </div>
          ) : (
            <DebtEmptyState
              hasActiveFilters={filterState.hasActiveFilters}
              onClear={filterState.clearFilters}
            />
          )}
        </section>
      </div>
    </>
  );
}

type DebtEmptyStateProps = {
  hasActiveFilters: boolean;
  onClear: () => void;
};

function DebtEmptyState({ hasActiveFilters, onClear }: DebtEmptyStateProps) {
  const { t } = useTranslation('debts', { keyPrefix: 'list.empty' });

  return (
    <div className="bg-card flex min-h-72 flex-col items-center justify-center rounded-2xl border border-dashed px-6 py-12 text-center">
      <div className="bg-muted text-muted-foreground flex size-12 items-center justify-center rounded-2xl">
        <SearchX className="size-6" aria-hidden="true" />
      </div>
      <h3 className="mt-4 font-semibold">
        {hasActiveFilters ? t('filteredTitle') : t('title')}
      </h3>
      <p className="text-muted-foreground mt-1 max-w-md text-sm leading-relaxed">
        {hasActiveFilters ? t('filteredDescription') : t('description')}
      </p>
      {hasActiveFilters ? (
        <Button
          type="button"
          variant="outline"
          onClick={onClear}
          className="mt-5"
        >
          {t('clearFilters')}
        </Button>
      ) : null}
    </div>
  );
}
