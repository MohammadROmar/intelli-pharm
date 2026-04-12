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
    <Card className="group relative overflow-hidden transition-transform duration-300 hover:-translate-y-0.5">
      <CardContent className="flex items-start justify-between gap-4 font-medium">
        <div className="min-w-0">
          <p className="text-muted-foreground text-sm font-medium uppercase">
            {title}
          </p>
          <p className="text-foreground truncate text-2xl font-bold tabular-nums md:text-3xl">
            {value}
          </p>
          <p className="text-muted-foreground text-xs">{subtitle}</p>
        </div>
        <div className="bg-muted text-muted-foreground flex size-10 shrink-0 items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-110">
          <Icon className="size-5" />
        </div>
      </CardContent>

      <div className="from-primary/20 absolute bottom-0 left-0 h-1 w-full to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 ltr:bg-linear-to-r rtl:bg-linear-to-l" />
    </Card>
  );
}
