const DATE_PATTERN = /^(\d{4})-(\d{1,2})-(\d{1,2})$/;

export function normalizeNotificationDate(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined;

  const match = DATE_PATTERN.exec(value);
  if (!match) return undefined;

  const [, yearValue, monthValue, dayValue] = match;
  const year = Number(yearValue);
  const month = Number(monthValue);
  const day = Number(dayValue);
  const date = new Date(Date.UTC(year, month - 1, day));

  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    return undefined;
  }

  return [
    String(year).padStart(4, '0'),
    String(month).padStart(2, '0'),
    String(day).padStart(2, '0'),
  ].join('-');
}

export function hasInvalidNotificationDateRange(
  fromDate?: string,
  toDate?: string,
): boolean {
  return Boolean(fromDate && toDate && fromDate > toDate);
}
