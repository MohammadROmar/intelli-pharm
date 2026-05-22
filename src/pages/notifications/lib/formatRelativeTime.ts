export function formatRelativeTime(dateString: string, locale: string): string {
  const diffSeconds = Math.floor(
    (Date.now() - new Date(dateString).getTime()) / 1000,
  );

  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });

  if (diffSeconds < 60) return rtf.format(-diffSeconds, 'second');
  if (diffSeconds < 3_600)
    return rtf.format(-Math.floor(diffSeconds / 60), 'minute');
  if (diffSeconds < 86_400)
    return rtf.format(-Math.floor(diffSeconds / 3_600), 'hour');
  if (diffSeconds < 604_800)
    return rtf.format(-Math.floor(diffSeconds / 86_400), 'day');
  if (diffSeconds < 2_592_000)
    return rtf.format(-Math.floor(diffSeconds / 604_800), 'week');

  return rtf.format(-Math.floor(diffSeconds / 2_592_000), 'month');
}
