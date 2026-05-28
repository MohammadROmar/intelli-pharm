import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { ShoppingCart, CheckCircle, XCircle, Package } from 'lucide-react';

import { useAreaFilters, AreaFiltersModal } from '@/features/metrics-area';
import type { AreaMetricsData } from '@/entities/metrics';
import { MetricsSummary, AcceptanceRateBar } from '@/entities/metrics';
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
  LabeledLink,
} from '@/shared/ui';

type Props = { data: AreaMetricsData };

export function AreaMetricsTable({ data }: Props) {
  const { t } = useTranslation('metrics', { keyPrefix: 'area' });
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
        label: t('summary.completedOrders'),
        value: summary.total_completed_orders,
        icon: CheckCircle,
      },
      {
        label: t('summary.cancelledOrders'),
        value: summary.total_cancelled_orders,
        icon: XCircle,
      },
      {
        label: t('summary.totalUnitsSold'),
        value: summary.total_units_sold,
        icon: Package,
      },
    ],
    [summary, t],
  );

  return (
    <>
      <MetricsSummary items={summaryItems} season={season} />

      <TableCard
        title={t('title')}
        toolbar={<AreaFilters />}
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
                <TableHead>{t('columns.region')}</TableHead>
                <TableHead>{t('columns.category')}</TableHead>
                <TableHead className="text-right">
                  {t('columns.orders')}
                </TableHead>
                <TableHead className="text-right">
                  {t('columns.completed')}
                </TableHead>
                <TableHead className="text-right">
                  {t('columns.cancelled')}
                </TableHead>
                <TableHead>{t('columns.completionRate')}</TableHead>
                <TableHead className="text-right">
                  {t('columns.unitsSold')}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((metric) => {
                const completionRate =
                  metric.total_orders > 0
                    ? metric.total_completed_orders / metric.total_orders
                    : 0;

                return (
                  <TableRow key={metric.id}>
                    <TableCell className="font-medium">
                      <LabeledLink
                        to={`/dashboard/regions/${metric.region_id}`}
                        label={metric.region_name}
                      />
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      <LabeledLink
                        to={`/dashboard/categories/${metric.category_id}`}
                        label={metric.category_name}
                      />
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {metric.total_orders}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {metric.total_completed_orders}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {metric.total_cancelled_orders}
                    </TableCell>
                    <TableCell>
                      <AcceptanceRateBar rate={completionRate} />
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {metric.total_units_sold}
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

// ─── Sub-components ───────────────────────────────────────────────────────────

function AreaFilters() {
  const [open, setOpen] = useState(false);
  const { filters, applyFilters, clearFilters, activeCount, hasActiveFilters } =
    useAreaFilters();

  return (
    <>
      <FiltersTrigger onClick={() => setOpen(true)} activeCount={activeCount} />
      <AreaFiltersModal
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
  const { hasActiveFilters, clearFilters } = useAreaFilters();

  return (
    <TableEmptyState
      variant={hasActiveFilters ? 'search' : 'empty'}
      onClearSearch={clearFilters}
    />
  );
}
