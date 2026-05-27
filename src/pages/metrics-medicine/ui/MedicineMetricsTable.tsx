import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Repeat2, Percent, ExternalLink } from 'lucide-react';

import {
  useMedicineFilters,
  MedicineFiltersModal,
} from '@/features/metrics-medicine';
import { MetricsSummaryCard, AcceptanceRateBar } from '@/entities/metrics';
import type { MedicineMetricsData } from '@/entities/metrics';
import { unwrapMetricsPaginated } from '@/shared/lib';
import {
  FiltersTrigger,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCard,
  TableEmptyState,
} from '@/shared/ui';

type Props = { data: MedicineMetricsData };

export function MedicineMetricsTable({ data }: Props) {
  const { t } = useTranslation('metrics', { keyPrefix: 'medicine' });
  const { pathname } = useLocation();

  const { metrics: metricsWrapper, summary, season } = data;
  const { items, page, pageSize, totalCount } =
    unwrapMetricsPaginated(metricsWrapper);

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
      <MetricsSummaryCard items={summaryItems} season={season} />

      <TableCard
        title={t('title')}
        toolbar={<MedicineFilters />}
        currItemsCount={items.length}
        basePath={pathname}
        currentPage={page}
        totalItems={totalCount}
        itemsPerPage={pageSize}
      >
        {items.length > 0 ? (
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
              {items.map((metric) => {
                const rate =
                  metric.alternative_acceptance_rate > 1
                    ? metric.alternative_acceptance_rate / 100
                    : metric.alternative_acceptance_rate;

                return (
                  <TableRow key={metric.id}>
                    <TableCell>
                      <Link
                        to={`/dashboard/medicines/${metric.medicine_id}`}
                        className="hover:text-primary group flex items-center gap-1 text-sm font-medium transition-colors hover:underline"
                      >
                        <span className="max-w-[20ch] truncate">
                          {metric.medicine_name}
                        </span>
                        <ExternalLink className="text-muted-foreground size-3 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
                      </Link>
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
