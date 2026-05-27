import { cn } from '@/shared/lib';

type Props = { rate: number; className?: string };

export function AcceptanceRateBar({ rate, className }: Props) {
  const percentage = Math.min(Math.max(rate * 100, 0), 100);
  const label = `${percentage.toFixed(1)}%`;

  const colorClass =
    percentage >= 75
      ? 'bg-green-500'
      : percentage >= 40
        ? 'bg-yellow-500'
        : 'bg-red-400';

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="bg-muted h-2 w-24 overflow-hidden rounded-full">
        <div
          className={cn('h-full rounded-full transition-all', colorClass)}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={label}
        />
      </div>
      <span className="text-muted-foreground w-12 text-xs tabular-nums">
        {label}
      </span>
    </div>
  );
}
