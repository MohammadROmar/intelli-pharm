import { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import type { TFunction } from 'i18next';
import { useTranslation } from 'react-i18next';
import { BarChart3, Activity } from 'lucide-react';

import type { MedicineMetric } from '../model/medicineMetricsTypes';
import { Card, CardContent, CardHeader, CardSectionHeader } from '@/shared/ui';

type MedicineChartsProps = {
  metrics: MedicineMetric[];
};

type AggregatedData = {
  name: string;
  orders: number;
  rate: number;
  fill: string;
};

type TooltipPayload<T> = { value: number; payload: T };

const getRateColor = (rate: number) => {
  if (rate >= 0.7) return '#10b981';
  if (rate >= 0.4) return '#f59e0b';
  return '#ef4444';
};

function useAggregatedMedicineMetrics(
  metrics: MedicineMetric[],
): AggregatedData[] {
  return useMemo(() => {
    const grouped = metrics.reduce<
      Record<
        number,
        { name: string; orders: number; rateSum: number; count: number }
      >
    >((acc, item) => {
      const id = item.medicine_id;
      if (!acc[id]) {
        acc[id] = { name: `#${id}`, orders: 0, rateSum: 0, count: 0 };
      }
      acc[id].orders += item.total_orders;
      acc[id].rateSum += item.alternative_acceptance_rate;
      acc[id].count += 1;
      return acc;
    }, {});

    return Object.values(grouped)
      .map((d) => {
        const rate = d.rateSum / d.count;
        return {
          name: d.name,
          orders: d.orders,
          rate,
          fill: getRateColor(rate),
        };
      })
      .sort((a, b) => b.orders - a.orders);
  }, [metrics]);
}

type OrdersTooltipProps = {
  active?: boolean;
  payload?: TooltipPayload<AggregatedData>[];
  label?: string;
  t: TFunction;
};

function OrdersTooltip({ active, payload, label, t }: OrdersTooltipProps) {
  if (!active || !payload?.length) return null;

  return (
    <div className="bg-popover text-popover-foreground border-border rounded-lg border p-3 shadow-md">
      <p className="mb-1 text-sm font-medium">{label}</p>
      <div className="flex flex-col gap-1">
        <span className="text-sm">
          {t('totalOrders')}:{' '}
          <span className="font-semibold">{payload[0].value}</span>
        </span>
      </div>
    </div>
  );
}

function OrdersByMedicineChart({ data }: { data: AggregatedData[] }) {
  const { t } = useTranslation('translation', {
    keyPrefix: 'metricsPage.medicine.ordersByMedsChart',
  });

  return (
    <Card>
      <CardHeader>
        <CardSectionHeader
          title={t('title')}
          description={t('subtitle')}
          icon={BarChart3}
        />
      </CardHeader>
      <CardContent className="h-64 pl-0!">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
          >
            <XAxis
              dataKey="name"
              tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              content={<OrdersTooltip t={t} />}
              cursor={{ fill: 'var(--muted)' }}
            />
            <Bar
              dataKey="orders"
              radius={[6, 6, 0, 0]}
              maxBarSize={40}
              fill="#0ea5e9"
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

type RateTooltipProps = {
  active?: boolean;
  payload?: TooltipPayload<AggregatedData>[];
  label?: string;
  t: TFunction;
};

function RateTooltip({ active, payload, label, t }: RateTooltipProps) {
  if (!active || !payload?.length) return null;

  const value = payload[0].value;
  const formattedValue = `${(value * 100).toFixed(1)}%`;

  return (
    <div className="bg-popover text-popover-foreground border-border rounded-lg border p-3 shadow-md">
      <p className="mb-1 text-sm font-medium">{label}</p>
      <div className="flex flex-col gap-1">
        <span className="text-sm">
          {t('acceptanceRate')}:{' '}
          <span className="font-semibold">{formattedValue}</span>
        </span>
      </div>
    </div>
  );
}

function AltAcceptanceRateChart({ data }: { data: AggregatedData[] }) {
  const { t } = useTranslation('translation', {
    keyPrefix: 'metricsPage.medicine.altAcceptanceRateChart',
  });

  return (
    <Card>
      <CardHeader>
        <CardSectionHeader
          title={t('title')}
          description={t('subtitle')}
          icon={Activity}
        />
      </CardHeader>
      <CardContent className="h-64 pl-0!">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
          >
            <XAxis
              dataKey="name"
              tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              domain={[0, 1]}
              tickFormatter={(v) => `${(v * 100).toFixed(0)}%`}
              tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              content={<RateTooltip t={t} />}
              cursor={{ fill: 'var(--muted)' }}
            />
            <Bar dataKey="rate" radius={[6, 6, 0, 0]} maxBarSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

function MedicineCharts({ metrics }: MedicineChartsProps) {
  const aggregatedData = useAggregatedMedicineMetrics(metrics);

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <OrdersByMedicineChart data={aggregatedData} />
      <AltAcceptanceRateChart data={aggregatedData} />
    </div>
  );
}

export default MedicineCharts;
