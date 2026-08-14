import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

type DateInput = string | Date;

interface SplitDateTimeValue {
  datePart: string;
  timePart: string;
}

export function useSplitDateTime(date: DateInput): SplitDateTimeValue {
  const { i18n } = useTranslation();
  const locale = i18n.resolvedLanguage ?? i18n.language;

  const dateFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }),
    [locale],
  );

  const timeFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        hour: 'numeric',
        minute: '2-digit',
      }),
    [locale],
  );

  const timestamp =
    date instanceof Date ? date.getTime() : new Date(date).getTime();

  if (Number.isNaN(timestamp)) {
    return {
      datePart: '—',
      timePart: '—',
    };
  }

  return {
    datePart: dateFormatter.format(timestamp),
    timePart: timeFormatter.format(timestamp),
  };
}
