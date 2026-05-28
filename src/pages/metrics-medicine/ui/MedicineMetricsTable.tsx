import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ShoppingCart, Repeat2, Percent } from 'lucide-react';

import {
  useMedicineFilters,
  MedicineFiltersModal,
} from '@/features/metrics-medicine';
import { MetricsSummary, AcceptanceRateBar } from '@/entities/metrics';
import type { MedicineMetricsData } from '@/entities/metrics';
import {
  FiltersTrigger,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCard,
  TableEmptyState,
  LabeledLink,
} from '@/shared/ui';

type Props = { data: MedicineMetricsData };

export function MedicineMetricsTable({ data }: Props) {
  const { t } = useTranslation('metrics', { keyPrefix: 'medicine' });

  const { metrics, summary, season, pagination } = data;

  const summaryItems = useMemo(
    () => [
      {
        label: t('summary.totalOrders'),
        value: summary.total_orders,
        icon: ShoppingCart,
      },
      {
        label: t('summary.alternativesUsed'),
        value: summary.alternatives_used_count,
        icon: Repeat2,
      },
      {
        label: t('summary.avgAcceptanceRate'),
        value: `${(summary.avg_acceptance_rate > 1 ? summary.avg_acceptance_rate : summary.avg_acceptance_rate * 100).toFixed(1)}%`,
        icon: Percent,
      },
    ],
    [summary, t],
  );

  return (
    <>
      <MetricsSummary
        items={summaryItems}
        season={season}
        className="xl:grid-cols-3!"
      />

      <TableCard
        title={t('title')}
        toolbar={<MedicineFilters />}
        currItemsCount={metrics.length}
        basePath="/dashboard/metrics/medicine"
        currentPage={pagination.current_page}
        totalItems={pagination.total}
        itemsPerPage={pagination.per_page}
      >
        {metrics.length > 0 ? (
          <>
            <TableHeader>
              <TableRow>
                <TableHead>{t('columns.medicine')}</TableHead>
                <TableHead className="text-right">
                  {t('columns.orders')}
                </TableHead>
                <TableHead className="text-right">
                  {t('columns.alternativesUsed')}
                </TableHead>
                <TableHead>{t('columns.acceptanceRate')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {metrics.map((metric) => {
                const rate =
                  metric.alternative_acceptance_rate > 1
                    ? metric.alternative_acceptance_rate / 100
                    : metric.alternative_acceptance_rate;

                return (
                  <TableRow key={metric.id}>
                    <TableCell>
                      <LabeledLink
                        to={`/dashboard/medicines/${metric.medicine_id}`}
                        label={metric.medicine_name}
                      />
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {metric.total_orders}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {metric.alternative_used_count}
                    </TableCell>
                    <TableCell>
                      <AcceptanceRateBar rate={rate} />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </>
        ) : (
          <EmptyState />
        )}
      </TableCard>
    </>
  );
}

function MedicineFilters() {
  const [open, setOpen] = useState(false);
  const { filters, applyFilters, clearFilters, activeCount, hasActiveFilters } =
    useMedicineFilters();

  return (
    <>
      <FiltersTrigger onClick={() => setOpen(true)} activeCount={activeCount} />
      <MedicineFiltersModal
        open={open}
        onOpenChange={setOpen}
        defaultValues={filters}
        hasActiveFilters={hasActiveFilters}
        onApply={(v) => {
          applyFilters(v);
          setOpen(false);
        }}
        onClear={() => {
          clearFilters();
          setOpen(false);
        }}
      />
    </>
  );
}

function EmptyState() {
  const { hasActiveFilters, clearFilters } = useMedicineFilters();

  return (
    <TableEmptyState
      variant={hasActiveFilters ? 'search' : 'empty'}
      onClearSearch={clearFilters}
    />
  );
}
