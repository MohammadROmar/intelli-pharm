import type { ElementType } from 'react';
import { useTranslation } from 'react-i18next';
import { CalendarDays } from 'lucide-react';

import { Badge } from '@/shared/ui';
import { cn } from '@/shared/lib';

import { StatCard } from './StatCard';
import type { MetricsSeason } from '../model/metricsTypes';

export type SummaryStatItem = {
  label: string;
  value: string | number;
  icon: ElementType;
  subtitle?: string;
};

type Props = {
  items: SummaryStatItem[];
  season?: MetricsSeason;
  className?: string;
};

export function MetricsSummary({ items, season, className }: Props) {
  const { t } = useTranslation('metrics', { keyPrefix: 'summary' });

  return (
    <div className="space-y-3">
      {season ? (
        <div className="flex items-center gap-2">
          <CalendarDays className="text-muted-foreground size-3.5" />
          <span className="text-muted-foreground text-xs font-medium">
            {t('period')}
          </span>
          <Badge variant="secondary" className="text-xs">
            {season.quarter} {season.year}
          </Badge>
        </div>
      ) : null}

      <div
        className={cn(
          'grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4',
          className,
        )}
      >
        {items.map((item) => (
          <StatCard
            key={item.label}
            icon={item.icon}
            title={item.label}
            value={item.value}
            subtitle={item.subtitle ?? ''}
          />
        ))}
      </div>
    </div>
  );
}
