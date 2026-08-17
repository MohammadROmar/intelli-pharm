import { memo, useId, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui';

import { formatCompactDate, formatCount } from '../model/format';
import type { OrdersTrend } from '../model/types';

type OrdersTrendChartProps = {
  trend: OrdersTrend;
  days: number;
};

type OrdersTrendTooltipContentProps = {
  active?: boolean;
  label?: ReactNode;
  payload?: ReadonlyArray<{ value?: unknown }>;
  language: string;
  ordersLabel: string;
};

function OrdersTrendTooltipContent({
  active,
  payload,
  label,
  language,
  ordersLabel,
}: OrdersTrendTooltipContentProps) {
  if (!active || !payload?.length) {
    return null;
  }

  const value = payload[0]?.value;

  return (
    <div className="border-border bg-popover text-popover-foreground rounded-lg border px-3 py-2 shadow-md">
      <p className="text-muted-foreground text-xs font-medium">
        {typeof label === 'string' ? formatCompactDate(label, language) : label}
      </p>

      <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold tabular-nums">
        <span aria-hidden className="bg-primary size-2 shrink-0 rounded-full" />

        {typeof value === 'number'
          ? formatCount(value, language)
          : String(value)}

        <span className="text-muted-foreground font-normal">{ordersLabel}</span>
      </p>
    </div>
  );
}

export const OrdersTrendChart = memo(function OrdersTrendChart({
  trend,
  days,
}: OrdersTrendChartProps) {
  const { t, i18n } = useTranslation('dashboard-overview', {
    keyPrefix: 'trend',
  });

  const gradientId = useId();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">
          {t('title', { count: days })}
        </CardTitle>
      </CardHeader>

      <CardContent className="h-55">
        <ResponsiveContainer
          width="100%"
          height="100%"
          initialDimension={{
            width: 400,
            height: 220,
          }}
        >
          <AreaChart
            data={trend}
            margin={{
              top: 8,
              right: 8,
              bottom: 0,
              left: 0,
            }}
          >
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="var(--color-primary)"
                  stopOpacity={0.35}
                />

                <stop
                  offset="100%"
                  stopColor="var(--color-primary)"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
              className="stroke-border"
            />

            <XAxis
              dataKey="date"
              tickFormatter={(value: string) =>
                formatCompactDate(value, i18n.language)
              }
              tickLine={false}
              axisLine={false}
              interval="preserveStartEnd"
              minTickGap={24}
              className="fill-muted-foreground text-xs"
            />

            <Tooltip
              content={({ active, payload, label }) => (
                <OrdersTrendTooltipContent
                  active={active}
                  payload={payload}
                  label={label}
                  language={i18n.language}
                  ordersLabel={t('ordersSeries')}
                />
              )}
              cursor={{
                stroke: 'var(--color-border)',
                strokeDasharray: '4 4',
              }}
              wrapperStyle={{
                outline: 'none',
              }}
            />

            <Area
              type="monotone"
              dataKey="orders_count"
              stroke="var(--color-primary)"
              strokeWidth={2}
              fill={`url(#${gradientId})`}
              activeDot={{
                r: 5,
                fill: 'var(--color-primary)',
                stroke: 'var(--color-card)',
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
});
