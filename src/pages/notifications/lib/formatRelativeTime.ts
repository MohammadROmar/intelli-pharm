export function formatRelativeTime(dateString: string, locale: string): string {
  const timestamp = new Date(dateString).getTime();
  if (Number.isNaN(timestamp)) return '';

  const diffSeconds = Math.trunc((Date.now() - timestamp) / 1000);
  const absoluteDiffSeconds = Math.abs(diffSeconds);

  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });

  if (absoluteDiffSeconds < 60) return rtf.format(-diffSeconds, 'second');
  if (absoluteDiffSeconds < 3_600)
    return rtf.format(-Math.trunc(diffSeconds / 60), 'minute');
  if (absoluteDiffSeconds < 86_400)
    return rtf.format(-Math.trunc(diffSeconds / 3_600), 'hour');
  if (absoluteDiffSeconds < 604_800)
    return rtf.format(-Math.trunc(diffSeconds / 86_400), 'day');
  if (absoluteDiffSeconds < 2_592_000)
    return rtf.format(-Math.trunc(diffSeconds / 604_800), 'week');

  return rtf.format(-Math.trunc(diffSeconds / 2_592_000), 'month');
}
