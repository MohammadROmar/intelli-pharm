export function formatRelativeTime(dateString: string, locale: string): string {
  const timestamp = new Date(dateString).getTime();
  if (Number.isNaN(timestamp)) return '';

  const diffSeconds = Math.max(0, Math.trunc((Date.now() - timestamp) / 1000));

  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });

  if (diffSeconds < 60) return rtf.format(-diffSeconds, 'second');
  if (diffSeconds < 3_600)
    return rtf.format(-Math.trunc(diffSeconds / 60), 'minute');
  if (diffSeconds < 86_400)
    return rtf.format(-Math.trunc(diffSeconds / 3_600), 'hour');
  if (diffSeconds < 604_800)
    return rtf.format(-Math.trunc(diffSeconds / 86_400), 'day');
  if (diffSeconds < 2_592_000)
    return rtf.format(-Math.trunc(diffSeconds / 604_800), 'week');

  return rtf.format(-Math.trunc(diffSeconds / 2_592_000), 'month');
}
