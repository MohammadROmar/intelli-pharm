import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ShoppingCart, Repeat2, Percent } from 'lucide-react';

import {
  useMedicineFilters,
  MedicineFiltersModal,
} from '@/features/metrics-medicine';
import { MetricsSummary, AcceptanceRateBar } from '@/entities/metrics';
import type { MedicineMetricsData } from '@/entities/metrics';
import {
  TableHead,
  TableCell,
  TableRow,
  LabeledLink,
  EntityListTable,
  EntityFiltersToolbar,
  EntityEmptyState,
} from '@/shared/ui';

type Props = { data: MedicineMetricsData; canViewMedicine: boolean };

export function MedicineMetricsTable({ data, canViewMedicine }: Props) {
  const { t } = useTranslation('metrics', { keyPrefix: 'medicine' });
  const { metrics, summary, season, pagination } = data;
  const filtersState = useMedicineFilters();

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
      <MetricsSummary
        items={summaryItems}
        season={season}
        className="xl:grid-cols-3!"
      />

      <EntityListTable
        data={paginatedData}
        title={t('title')}
        basePath="/dashboard/metrics/medicine"
        toolbar={
          <EntityFiltersToolbar
            filtersState={filtersState}
            FiltersModal={MedicineFiltersModal}
          />
        }
        columns={
          <>
            <TableHead>{t('columns.medicine')}</TableHead>
            <TableHead className="text-right">{t('columns.orders')}</TableHead>
            <TableHead className="text-right">
              {t('columns.alternativesUsed')}
            </TableHead>
            <TableHead>{t('columns.acceptanceRate')}</TableHead>
          </>
        }
        renderRow={(metric) => {
          const rate =
            metric.alternative_acceptance_rate > 1
              ? metric.alternative_acceptance_rate / 100
              : metric.alternative_acceptance_rate;

          return (
            <TableRow key={metric.id}>
              <TableCell>
                <LabeledLink
                  to={
                    canViewMedicine
                      ? `/dashboard/medicines/${metric.medicine_id}`
                      : undefined
                  }
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
