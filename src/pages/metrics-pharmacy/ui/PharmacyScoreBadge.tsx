import { Badge } from '@/shared/ui';
import { cn } from '@/shared/lib';

export type ScoreTier = 'excellent' | 'average' | 'poor' | 'na';

export type ScoreBadgeProps = {
  score: string | number;
  className?: string;
};

const SCORE_THRESHOLDS = {
  EXCELLENT: 70,
  AVERAGE: 50,
} as const;

const SCORE_TIER_STYLES: Record<ScoreTier, string> = {
  excellent:
    'bg-emerald-50 text-emerald-700 border-emerald-200/60 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20',
  average:
    'bg-amber-50 text-amber-700 border-amber-200/60 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20',
  poor: 'bg-rose-50 text-rose-700 border-rose-200/60 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/20',
  na: 'bg-slate-50 text-slate-600 border-slate-200/60 dark:bg-slate-500/10 dark:text-slate-400 dark:border-slate-500/20',
};

const getScoreTier = (score: number): ScoreTier => {
  if (Number.isNaN(score)) return 'na';
  if (score >= SCORE_THRESHOLDS.EXCELLENT) return 'excellent';
  if (score >= SCORE_THRESHOLDS.AVERAGE) return 'average';
  return 'poor';
};

export const ScoreBadge = ({ score, className }: ScoreBadgeProps) => {
  const numericScore = typeof score === 'string' ? parseFloat(score) : score;
  const tier = getScoreTier(numericScore);
  const styles = SCORE_TIER_STYLES[tier];

  const displayScore =
    tier === 'na'
      ? '-'
      : Number(numericScore).toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });

  return (
    <Badge
      variant="outline"
      className={cn(
        'inline-flex items-center justify-center rounded-full px-2.5 py-0.5',
        'font-medium tracking-tight tabular-nums shadow-sm transition-colors',
        styles,
        className,
      )}
    >
      {displayScore}
    </Badge>
  );
};
