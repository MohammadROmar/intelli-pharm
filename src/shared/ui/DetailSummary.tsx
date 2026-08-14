import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';

type DetailSummaryProps = {
  ariaLabel: string;
  children: ReactNode;
};

export function DetailSummary({ ariaLabel, children }: DetailSummaryProps) {
  return (
    <section
      aria-label={ariaLabel}
      className="bg-card grid overflow-hidden rounded-2xl border shadow-sm sm:grid-cols-2 xl:grid-cols-4"
    >
      {children}
    </section>
  );
}

type DetailSummaryItemProps = {
  icon: LucideIcon;
  label: string;
  children: ReactNode;
};

export function DetailSummaryItem({
  icon: Icon,
  label,
  children,
}: DetailSummaryItemProps) {
  return (
    <div className="flex min-w-0 items-start gap-3 border-b p-4 last:border-b-0 sm:odd:border-e sm:nth-3:border-b-0 xl:border-e xl:border-b-0 xl:last:border-e-0">
      <div className="bg-muted text-muted-foreground flex size-9 shrink-0 items-center justify-center rounded-lg">
        <Icon className="size-4" aria-hidden="true" />
      </div>
      <div className="min-w-0 space-y-1">
        <p className="text-muted-foreground text-xs font-medium">{label}</p>
        <div className="min-w-0 text-sm">{children}</div>
      </div>
    </div>
  );
}
