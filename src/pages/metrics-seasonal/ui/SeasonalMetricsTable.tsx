import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ShoppingCart, Package, Banknote, TrendingUp } from 'lucide-react';

import {
  SeasonalFiltersModal,
  useSeasonalFilters,
} from '@/features/metrics-seasonal';
import { MetricsSummary, type SeasonalMetricsData } from '@/entities/metrics';
import { formatDate, formatPrice } from '@/shared/lib';
import {
  TableHead,
  TableRow,
  TableCell,
  LabeledLink,
  EntityListTable,
  EntityFiltersToolbar,
  EntityEmptyState,
} from '@/shared/ui';

type Props = { data: SeasonalMetricsData };

export function SeasonalMetricsTable({ data }: Props) {
  const { t, i18n } = useTranslation('metrics', { keyPrefix: 'seasonal' });
  const { metrics, summary, season, pagination } = data;
  const filtersState = useSeasonalFilters();

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

  const paginatedData = useMemo(
    () => ({
      data: metrics,
      meta: {
        current_page: pagination.current_page,
        per_page: pagination.per_page,
        total: pagination.total,
      },
    }),
    [metrics, pagination],
  );

  return (
    <>
      <MetricsSummary items={summaryItems} season={season} />

      <EntityListTable
        data={paginatedData}
        title={t('title')}
        basePath="/dashboard/metrics/seasonal"
        toolbar={
          <EntityFiltersToolbar
            filtersState={filtersState}
            FiltersModal={SeasonalFiltersModal}
          />
        }
        columns={
          <>
            <TableHead>{t('columns.pharmacy')}</TableHead>
            <TableHead>{t('columns.category')}</TableHead>
            <TableHead>{t('columns.orders')}</TableHead>
            <TableHead>{t('columns.units')}</TableHead>
            <TableHead>{t('columns.revenue')}</TableHead>
            <TableHead>{t('columns.avgOrder')}</TableHead>
            <TableHead>{t('columns.computedAt')}</TableHead>
          </>
        }
        renderRow={(metric) => (
          <TableRow key={metric.id}>
            <TableCell>
              <LabeledLink
                to={`/dashboard/pharmacies/${metric.pharmacy_id}`}
                label={metric.pharmacy_name}
              />
            </TableCell>
            <TableCell className="text-muted-foreground">
              <LabeledLink
                to={`/dashboard/categories/${metric.category_id}`}
                label={metric.category_name}
              />
            </TableCell>
            <TableCell className="tabular-nums">{metric.order_count}</TableCell>
            <TableCell className="tabular-nums">{metric.total_units}</TableCell>
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
        )}
        emptyState={
          <EntityEmptyState
            hasActiveFilters={filtersState.hasActiveFilters}
            clearFilters={filtersState.clearFilters}
          />
        }
      />
    </>
  );
}
