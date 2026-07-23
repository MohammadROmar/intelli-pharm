import { memo } from 'react';
import { ArrowRight, Trophy } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { cn, formatPrice } from '@/shared/lib';
import { Badge, Card, CardContent, CardHeader, CardTitle } from '@/shared/ui';

import {
  ATTAINMENT_THRESHOLD_AT_RISK,
  ATTAINMENT_THRESHOLD_ON_TRACK,
} from '../model/constants';
import { formatCount } from '../model/format';
import type { TargetLeaderboard } from '../model/types';

type TargetLeaderboardCardProps = { rows: TargetLeaderboard };
type AttainmentVariant = 'success' | 'warning' | 'destructive';

function attainmentVariant(pct: number): AttainmentVariant {
  if (pct >= ATTAINMENT_THRESHOLD_ON_TRACK) return 'success';
  if (pct >= ATTAINMENT_THRESHOLD_AT_RISK) return 'warning';
  return 'destructive';
}

const PROGRESS_FILL: Record<AttainmentVariant, string> = {
  success: 'bg-success',
  warning: 'bg-warning',
  destructive: 'bg-destructive',
};

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();
}

export const TargetLeaderboardCard = memo(function TargetLeaderboardCard({
  rows,
}: TargetLeaderboardCardProps) {
  const { t, i18n } = useTranslation('dashboard-overview', {
    keyPrefix: 'targets',
  });

  return (
    <Card>
      <CardHeader className="flex! flex-row! items-center justify-between space-y-0">
        <CardTitle className="text-sm font-medium">{t('title')}</CardTitle>
        <Link
          to="/dashboard/targets"
          className="text-primary group flex items-center gap-1 text-xs font-medium"
        >
          {t('viewLink')}
          <ArrowRight
            className="size-3.5 transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5"
            aria-hidden="true"
          />
        </Link>
      </CardHeader>
      <CardContent>
        {rows.length > 0 ? (
          <ul className="-mx-2">
            {rows.map((row, index) => {
              const variant = attainmentVariant(row.attainment_pct);
              const pct = Math.min(
                100,
                Math.max(0, Math.round(row.attainment_pct)),
              );

              return (
                <li
                  key={row.employee_id}
                  className="hover:bg-muted/50 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-1 flex items-center gap-3 rounded-lg px-2 py-2.5 transition-colors motion-reduce:animate-none"
                  style={{
                    animationDelay: `${index * 40}ms`,
                    animationDuration: '300ms',
                  }}
                >
                  <span
                    className={cn(
                      'flex size-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold',
                      index === 0
                        ? 'bg-primary/10 text-primary ring-primary/20 ring-1'
                        : 'bg-muted text-muted-foreground',
                    )}
                  >
                    {index === 0 ? (
                      <Trophy className="size-4" aria-hidden="true" />
                    ) : (
                      getInitials(row.name)
                    )}
                  </span>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-foreground truncate text-sm">
                        {row.name}
                      </span>
                      <Badge variant={variant}>
                        {formatCount(pct, i18n.language)}%
                      </Badge>
                    </div>
                    <div className="mt-1.5 flex items-center gap-2">
                      <div className="bg-muted h-1.5 flex-1 overflow-hidden rounded-full">
                        <div
                          className={cn(
                            'h-full rounded-full transition-all duration-500',
                            PROGRESS_FILL[variant],
                          )}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="text-muted-foreground shrink-0 text-xs tabular-nums">
                        {formatPrice(row.actual)} / {formatPrice(row.quota)}
                      </span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-muted-foreground py-8 text-center text-sm">
            {t('empty')}
          </p>
        )}
      </CardContent>
    </Card>
  );
});
