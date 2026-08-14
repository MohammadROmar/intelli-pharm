import type { ElementType } from 'react';

import { useSplitDateTime } from '../lib/hooks/useSplitDateTime';

interface SplitDateTimeProps {
  date: string | Date;
  icon: ElementType;
}

export function SplitDateTime({ date, icon: Icon }: SplitDateTimeProps) {
  const { datePart, timePart } = useSplitDateTime(date);

  return (
    <span className="flex min-w-0 items-start gap-1.5 font-normal sm:items-center">
      <Icon
        aria-hidden="true"
        className="text-muted-foreground size-3.5 shrink-0"
      />

      <span className="flex flex-col leading-none sm:flex-row sm:items-center sm:gap-1.5">
        <span className="block truncate">{datePart}</span>

        <span className="text-muted-foreground block text-sm">{timePart}</span>
      </span>
    </span>
  );
}
