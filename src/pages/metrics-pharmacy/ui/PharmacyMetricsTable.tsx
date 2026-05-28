import { useState, useMemo } from 'react';
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

type Props = { data: PharmacyMetricsData };

export function PharmacyMetricsTable({ data }: Props) {
  const { t, i18n } = useTranslation('metrics', { keyPrefix: 'pharmacy' });

  const { metrics: items, pagination, summary } = data;

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

  return (
    <>
      <MetricsSummary items={summaryItems} />

      <TableCard
        title={t('title')}
        toolbar={<PharmacyFilters />}
        currItemsCount={items.length}
        basePath="/dashboard/metrics/pharmacy"
        currentPage={pagination.current_page}
        totalItems={pagination.total}
        itemsPerPage={pagination.per_page}
      >
        {items.length > 0 ? (
          <>
            <TableHeader>
              <TableRow>
                <TableHead>{t('columns.pharmacy')}</TableHead>
                <TableHead>{t('columns.tier')}</TableHead>
                <TableHead className="text-right">
                  {t('columns.score')}
                </TableHead>
                <TableHead className="text-right">
                  {t('columns.orders')}
                </TableHead>
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
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((metric) => {
                const completionRate =
                  metric.completion_rate > 1
                    ? metric.completion_rate / 100
                    : metric.completion_rate;

                return (
                  <TableRow key={metric.id}>
                    <TableCell className="font-medium">
                      <LabeledLink
                        to={`/dashboard/pharmacies/${metric.pharmacy_id}`}
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

function PharmacyFilters() {
  const [open, setOpen] = useState(false);
  const { filters, applyFilters, clearFilters, activeCount, hasActiveFilters } =
    usePharmacyFilters();

  return (
    <>
      <FiltersTrigger onClick={() => setOpen(true)} activeCount={activeCount} />
      <PharmacyFiltersModal
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
  const { hasActiveFilters, clearFilters } = usePharmacyFilters();

  return (
    <TableEmptyState
      variant={hasActiveFilters ? 'search' : 'empty'}
      onClearSearch={clearFilters}
    />
  );
}
