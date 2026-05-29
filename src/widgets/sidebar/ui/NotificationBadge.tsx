import { cn } from '@/shared/lib';

const BADGE_MAX = 99;

type NotificationBadgeProps = {
  count: number;
  className?: string;
};

export function NotificationBadge({
  count,
  className,
}: NotificationBadgeProps) {
  if (!count || count <= 0) return null;

  const label =
    count > BADGE_MAX
      ? 'More than 99 unread notifications'
      : `${count} unread notification${count === 1 ? '' : 's'}`;

  return (
    <span
      aria-label={label}
      className={cn(
        'pointer-events-none inline-flex h-4 min-w-4 items-center select-none',
        'bg-destructive justify-center rounded-full px-0.5',
        'text-destructive-foreground text-[10px] leading-none font-bold',
        'ring-background ring-1',
        className,
      )}
    >
      {count > BADGE_MAX ? `${BADGE_MAX}+` : count}
    </span>
  );
}
