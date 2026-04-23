import type { ElementType } from 'react';
import { useTranslation } from 'react-i18next';

interface SplitDateTimeProps {
  date: string | Date;
  icon: ElementType;
}

export function SplitDateTime({ date, icon: Icon }: SplitDateTimeProps) {
  const { i18n } = useTranslation();

  const dateObj = typeof date === 'string' ? new Date(date) : date;

  const locale = i18n.language;

  const datePart = new Intl.DateTimeFormat(locale, {
    dateStyle: 'medium',
  }).format(dateObj);
  const timePart = new Intl.DateTimeFormat(locale, {
    timeStyle: 'short',
  }).format(dateObj);

  return (
    <span className="flex min-w-0 items-start gap-1.5 font-normal sm:items-center">
      <Icon className="text-muted-foreground size-3.5 shrink-0" />

      <span className="flex flex-col leading-none sm:flex-row sm:items-center sm:gap-1.5">
        <span className="block truncate">{datePart}</span>
        <span className="text-muted-foreground block text-sm">{timePart}</span>
      </span>
    </span>
  );
}
