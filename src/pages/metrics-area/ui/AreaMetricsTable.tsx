import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ShoppingCart, CheckCircle, XCircle, Package } from 'lucide-react';

import { useAreaFilters, AreaFiltersModal } from '@/features/metrics-area';
import type { AreaMetricsData } from '@/entities/metrics';
import { MetricsSummary, AcceptanceRateBar } from '@/entities/metrics';
import {
  TableHead,
  TableCell,
  TableRow,
  LabeledLink,
  EntityListTable,
  EntityFiltersToolbar,
  EntityEmptyState,
} from '@/shared/ui';

type Props = {
  data: AreaMetricsData;
  canViewRegion: boolean;
  canViewCategory: boolean;
};

export function AreaMetricsTable({
  data,
  canViewRegion,
  canViewCategory,
}: Props) {
  const { t } = useTranslation('metrics', { keyPrefix: 'area' });
  const { metrics, summary, season, pagination } = data;
  const filtersState = useAreaFilters();

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
        basePath="/dashboard/metrics/area"
        toolbar={
          <EntityFiltersToolbar
            filtersState={filtersState}
            FiltersModal={AreaFiltersModal}
          />
        }
        columns={
          <>
            <TableHead>{t('columns.region')}</TableHead>
            <TableHead>{t('columns.category')}</TableHead>
            <TableHead className="text-right">{t('columns.orders')}</TableHead>
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
          </>
        }
        renderRow={(metric) => {
          const completionRate =
            metric.total_orders > 0
              ? metric.total_completed_orders / metric.total_orders
              : 0;

          return (
            <TableRow key={metric.id}>
              <TableCell className="font-medium">
                <LabeledLink
                  to={
                    canViewRegion
                      ? `/dashboard/regions/${metric.region_id}`
                      : undefined
                  }
                  label={metric.region_name}
                />
              </TableCell>
              <TableCell className="text-muted-foreground">
                <LabeledLink
                  to={
                    canViewCategory
                      ? `/dashboard/categories/${metric.category_id}`
                      : undefined
                  }
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
        }}
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
