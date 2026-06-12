import { useTranslation } from 'react-i18next';
import { useState } from 'react';

import { PlanFiltersModal } from './PlanFiltersModal';
import { PlanRow } from './PlanRow';
import { usePlanFilters } from '../model/usePlanFilters';

import type { PlanListApiResponse } from '@/entities/plan';
import {
  FiltersTrigger,
  TableBody,
  TableCard,
  TableEmptyState,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui';

export function PlansTable({ data }: { data: PlanListApiResponse }) {
  const { t } = useTranslation('plan', { keyPrefix: 'list' });
  const [filtersOpen, setFiltersOpen] = useState(false);
  const { filters, applyFilters, clearFilters, activeCount, hasActiveFilters } =
    usePlanFilters();

  const plans = data.data ?? [];
  const meta = data.meta;
  const isEmpty = plans.length === 0;

  return (
    <TableCard
      title={t('title')}
      toolbar={
        <FiltersTrigger
          onClick={() => setFiltersOpen(true)}
          activeCount={activeCount}
        />
      }
      currItemsCount={plans.length}
      basePath="/dashboard/plans"
      addLabel={t('initiate')}
      addHref="/dashboard/plans/initiate"
      currentPage={meta.current_page}
      totalItems={meta.total}
      itemsPerPage={meta.per_page}
    >
      {isEmpty ? (
        <TableEmptyState
          variant={hasActiveFilters ? 'search' : 'empty'}
          onClearSearch={clearFilters}
        />
      ) : (
        <>
          <TableHeader>
            <TableRow>
              <TableHead className="w-32">{t('table.id')}</TableHead>
              <TableHead>{t('table.userName')}</TableHead>
              <TableHead>{t('table.createdAt')}</TableHead>
              <TableHead>{t('table.reason')}</TableHead>
              <TableHead>{t('table.distance')}</TableHead>
              <TableHead>{t('table.duration')}</TableHead>
              <TableHead>{t('table.actions')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {plans.map((plan) => (
              <PlanRow key={plan.id} plan={plan} />
            ))}
          </TableBody>
        </>
      )}

      <PlanFiltersModal
        open={filtersOpen}
        onOpenChange={setFiltersOpen}
        defaultValues={filters}
        hasActiveFilters={hasActiveFilters}
        onApply={(values) => {
          applyFilters(values);
          setFiltersOpen(false);
        }}
        onClear={() => {
          clearFilters();
          setFiltersOpen(false);
        }}
      />
    </TableCard>
  );
}
