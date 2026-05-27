import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import {
  ShoppingCart,
  Package,
  Banknote,
  TrendingUp,
  ExternalLink,
} from 'lucide-react';

import {
  SeasonalFiltersModal,
  useSeasonalFilters,
} from '@/features/metrics-seasonal';
import {
  MetricsSummaryCard,
  type SeasonalMetricsData,
} from '@/entities/metrics';
import { formatDate, formatPrice, unwrapMetricsPaginated } from '@/shared/lib';
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

type Props = { data: SeasonalMetricsData };

export function SeasonalMetricsTable({ data }: Props) {
  const { t, i18n } = useTranslation('metrics', { keyPrefix: 'seasonal' });
  const { pathname } = useLocation();

  const { metrics: metricsWrapper, summary, season } = data;
  const { items, page, pageSize, totalCount } =
    unwrapMetricsPaginated(metricsWrapper);

  const summaryItems = useMemo(
    () => [
      {
        label: t('summary.orderCount'),
        value: summary.order_count,
        icon: ShoppingCart,
      },
      {
        label: t('summary.totalUnits'),
        value: summary.total_units,
        icon: Package,
      },
      {
        label: t('summary.totalRevenue'),
        value: formatPrice(summary.total_revenue, i18n.language),
        icon: Banknote,
      },
      {
        label: t('summary.avgOrderValue'),
        value: formatPrice(summary.avg_order_value, i18n.language),
        icon: TrendingUp,
      },
    ],
    [summary, t, i18n.language],
  );

  return (
    <>
      <MetricsSummaryCard items={summaryItems} season={season} />

      <TableCard
        title={t('title')}
        toolbar={<SeasonalFilters />}
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
                <TableHead>{t('columns.pharmacy')}</TableHead>
                <TableHead>{t('columns.category')}</TableHead>
                <TableHead>{t('columns.orders')}</TableHead>
                <TableHead>{t('columns.units')}</TableHead>
                <TableHead>{t('columns.revenue')}</TableHead>
                <TableHead>{t('columns.avgOrder')}</TableHead>
                <TableHead>{t('columns.computedAt')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((metric) => (
                <TableRow key={metric.id}>
                  <TableCell className="font-medium">
                    <Link
                      to={`/dashboard/pharmacies/${metric.pharmacy_id}`}
                      className="hover:text-primary group flex items-center gap-1 text-sm font-medium transition-colors hover:underline"
                    >
                      <span className="max-w-[20ch] truncate">
                        {metric.pharmacy_name}
                      </span>
                      <ExternalLink className="text-muted-foreground size-3 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
                    </Link>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {metric.category_name}
                  </TableCell>
                  <TableCell className="tabular-nums">
                    {metric.order_count}
                  </TableCell>
                  <TableCell className="tabular-nums">
                    {metric.total_units}
                  </TableCell>
                  <TableCell className="tabular-nums">
                    {formatPrice(metric.total_revenue, i18n.language)}
                  </TableCell>
                  <TableCell className="tabular-nums">
                    {formatPrice(metric.avg_order_value, i18n.language)}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatDate(metric.computed_at, i18n.language)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </>
        ) : (
          <EmptyState />
        )}
      </TableCard>
    </>
  );
}

function SeasonalFilters() {
  const [open, setOpen] = useState(false);
  const { filters, applyFilters, clearFilters, activeCount, hasActiveFilters } =
    useSeasonalFilters();
  return (
    <>
      <FiltersTrigger onClick={() => setOpen(true)} activeCount={activeCount} />
      <SeasonalFiltersModal
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
  const { hasActiveFilters, clearFilters } = useSeasonalFilters();

  return (
    <TableEmptyState
      variant={hasActiveFilters ? 'search' : 'empty'}
      onClearSearch={clearFilters}
    />
  );
}
