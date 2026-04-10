import { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useTranslation } from 'react-i18next';
import type { TFunction } from 'i18next';

import type { PharmacyMetrics } from '../model/pharmacyMetricsTypes';
import { Card, CardContent, CardHeader, CardSectionHeader } from '@/shared/ui';
import { BarChart4 } from 'lucide-react';

type ScoreChartProps = { metrics: PharmacyMetrics[] };

type ChartData = {
  name: string;
  score: number;
  recency: number;
  fill: string;
};

type TooltipPayload = { value: number; payload: ChartData };

type CustomTooltipProps = {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
  t: TFunction;
};

function getBarColor(score: number) {
  if (score >= 70) return '#10b981';
  if (score >= 50) return '#f59e0b';
  return '#ef4444';
}

function CustomTooltip({ active, payload, label, t }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-popover text-popover-foreground border-border rounded-lg border p-3 shadow-md">
        <p className="mb-1 text-sm font-medium">{label}</p>
        <div className="flex flex-col gap-1">
          <span className="text-sm">
            {t('score')}:{' '}
            <span className="font-semibold">{payload[0].value}</span>
          </span>
          <span className="text-muted-foreground text-xs">
            {t('recency')}: {payload[0].payload.recency}
          </span>
        </div>
      </div>
    );
  }

  return null;
}

function ScoreChart({ metrics }: ScoreChartProps) {
  const { t } = useTranslation('translation', {
    keyPrefix: 'metricsPage.pharmacy.scoreChart',
  });

  const chartData: ChartData[] = useMemo(
    () =>
      metrics.map((item) => {
        const score = parseFloat(item.score);
        return {
          name: `#${item.pharmacy_id}`,
          score,
          recency: parseFloat(item.recency_score),
          fill: getBarColor(score),
        };
      }),
    [metrics],
  );

  return (
    <Card>
      <CardHeader>
        <CardSectionHeader
          title={t('title')}
          description={t('subtitle')}
          icon={BarChart4}
        />
      </CardHeader>

      <CardContent className="h-64 pl-0!">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
          >
            <XAxis
              dataKey="name"
              tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }}
            />
            <YAxis
              domain={[0, 100]}
              tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }}
            />
            <Tooltip
              content={<CustomTooltip t={t} />}
              cursor={{ fill: 'var(--muted)' }}
            />
            <Bar dataKey="score" radius={[6, 6, 0, 0]} maxBarSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export default ScoreChart;
