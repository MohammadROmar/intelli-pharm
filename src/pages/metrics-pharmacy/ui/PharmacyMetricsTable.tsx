import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ShoppingCart,
  CheckCircle,
  Package,
  Percent,
  BarChart2,
  Star,
  Clock,
} from 'lucide-react';

import {
  usePharmacyFilters,
  PharmacyFiltersModal,
} from '@/features/metrics-pharmacy';
import { TierBadge } from '@/features/metrics-pharmacy';
import type { PharmacyMetricsData } from '@/entities/metrics';
import { AcceptanceRateBar, MetricsSummary } from '@/entities/metrics';
import { formatDate } from '@/shared/lib';
import {
  TableHead,
  TableCell,
  TableRow,
  LabeledLink,
  EntityListTable,
  EntityFiltersToolbar,
  EntityEmptyState,
} from '@/shared/ui';

type Props = { data: PharmacyMetricsData; canViewPharmacy: boolean };

export function PharmacyMetricsTable({ data, canViewPharmacy }: Props) {
  const { t, i18n } = useTranslation('metrics', { keyPrefix: 'pharmacy' });
  const { metrics, pagination, summary } = data;
  const filtersState = usePharmacyFilters();

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
        label: t('summary.totalItems'),
        value: summary.total_items,
        icon: Package,
      },
      {
        label: t('summary.avgCompletionRate'),
        value: `${(summary.avg_completion_rate > 1 ? summary.avg_completion_rate : summary.avg_completion_rate * 100).toFixed(1)}%`,
        icon: Percent,
      },
      {
        label: t('summary.avgItemsPerOrder'),
        value: summary.avg_items_per_order.toFixed(1),
        icon: BarChart2,
      },
      {
        label: t('summary.avgScore'),
        value: summary.avg_score.toFixed(1),
        icon: Star,
      },
      {
        label: t('summary.avgRecencyScore'),
        value: summary.avg_recency_score.toFixed(1),
        icon: Clock,
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
      <MetricsSummary items={summaryItems} />

      <EntityListTable
        data={paginatedData}
        title={t('title')}
        basePath="/dashboard/metrics/pharmacy"
        toolbar={
          <EntityFiltersToolbar
            filtersState={filtersState}
            FiltersModal={PharmacyFiltersModal}
          />
        }
        columns={
          <>
            <TableHead>{t('columns.pharmacy')}</TableHead>
            <TableHead>{t('columns.tier')}</TableHead>
            <TableHead className="text-right">{t('columns.score')}</TableHead>
            <TableHead className="text-right">{t('columns.orders')}</TableHead>
            <TableHead className="text-right">
              {t('columns.completed')}
            </TableHead>
            <TableHead>{t('columns.completionRate')}</TableHead>
            <TableHead className="text-right">
              {t('columns.avgItems')}
            </TableHead>
            <TableHead>{t('columns.lastOrder')}</TableHead>
            <TableHead className="text-right">
              {t('columns.recencyScore')}
            </TableHead>
          </>
        }
        renderRow={(metric) => {
          const completionRate =
            metric.completion_rate > 1
              ? metric.completion_rate / 100
              : metric.completion_rate;

          return (
            <TableRow key={metric.id}>
              <TableCell className="font-medium">
                <LabeledLink
                  to={
                    canViewPharmacy
                      ? `/dashboard/pharmacies/${metric.pharmacy_id}`
                      : undefined
                  }
                  label={metric.pharmacy_name}
                />
              </TableCell>
              <TableCell>
                <TierBadge tier={metric.tier} />
              </TableCell>
              <TableCell className="text-right tabular-nums">
                {metric.score.toFixed(1)}
              </TableCell>
              <TableCell className="text-right tabular-nums">
                {metric.total_orders}
              </TableCell>
              <TableCell className="text-right tabular-nums">
                {metric.completed_orders}
              </TableCell>
              <TableCell>
                <AcceptanceRateBar rate={completionRate} />
              </TableCell>
              <TableCell className="text-right tabular-nums">
                {metric.avg_items_per_order.toFixed(1)}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {formatDate(metric.last_order_at, i18n.language)}
              </TableCell>
              <TableCell className="text-right tabular-nums">
                {metric.recency_score.toFixed(1)}
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
