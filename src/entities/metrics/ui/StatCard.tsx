import type { ElementType } from 'react';

import { Card, CardContent } from '@/shared/ui';

type StatCardProps = {
  icon: ElementType;
  title: string;
  subtitle: string;
  value: string | number;
};

export function StatCard({
  icon: Icon,
  title,
  subtitle,
  value,
}: StatCardProps) {
  return (
    <Card className="group hover:shadow-primary/10 hover:border-primary/20 relative overflow-hidden py-2! transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="from-primary/25 dark:from-primary/15 pointer-events-none absolute -inset-px rounded-xl via-transparent to-transparent ltr:bg-linear-to-bl rtl:bg-linear-to-br" />{' '}
      <CardContent className="relative flex items-start justify-between gap-3 p-5">
        <div className="min-w-0 flex-1">
          <p className="text-muted-foreground/70 mb-1 truncate text-xs font-semibold tracking-widest uppercase">
            {title}
          </p>
          <p className="text-foreground text-xl leading-tight font-bold tracking-tight wrap-break-word md:text-2xl">
            {value}
          </p>
          <p className="text-muted-foreground mt-1 truncate text-xs">
            {subtitle}
          </p>
        </div>

        <div className="relative mt-0.5 shrink-0">
          <div className="bg-primary/20 absolute inset-0 rounded-xl blur-md duration-300" />
          <div className="bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary relative flex size-11 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110">
            <Icon className="size-5" />
          </div>
        </div>
      </CardContent>
      <div className="from-primary via-primary/60 absolute bottom-0 h-0.5 w-0 to-transparent opacity-0 transition-all duration-500 group-hover:w-full group-hover:opacity-100 ltr:left-0 ltr:bg-linear-to-r rtl:right-0 rtl:bg-linear-to-l" />{' '}
    </Card>
  );
}
