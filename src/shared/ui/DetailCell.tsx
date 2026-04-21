import { cn } from '../lib';

type Props = { label: string; className?: string; children: React.ReactNode };

export function DetailCell({ label, className, children }: Props) {
  return (
    <div className={cn('space-y-1.5', className)}>
      <p className="text-muted-foreground text-[11px] font-medium tracking-widest uppercase">
        {label}
      </p>
      <div className="text-sm font-semibold">{children}</div>
    </div>
  );
}
