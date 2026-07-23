const signedPercentFormatters = new Map<string, Intl.NumberFormat>();
const compactDateFormatters = new Map<string, Intl.DateTimeFormat>();
const countFormatters = new Map<string, Intl.NumberFormat>();

function getSignedPercentFormatter(locale: string): Intl.NumberFormat {
  let formatter = signedPercentFormatters.get(locale);
  if (!formatter) {
    formatter = new Intl.NumberFormat(locale, {
      style: 'percent',
      maximumFractionDigits: 1,
      signDisplay: 'exceptZero',
    });
    signedPercentFormatters.set(locale, formatter);
  }
  return formatter;
}

export function formatSignedPercent(value: number, locale: string): string {
  return getSignedPercentFormatter(locale).format(value / 100);
}

function getCompactDateFormatter(locale: string): Intl.DateTimeFormat {
  let formatter = compactDateFormatters.get(locale);
  if (!formatter) {
    formatter = new Intl.DateTimeFormat(locale, {
      month: 'short',
      day: 'numeric',
    });
    compactDateFormatters.set(locale, formatter);
  }
  return formatter;
}

export function formatCompactDate(isoDate: string, locale: string): string {
  return getCompactDateFormatter(locale).format(
    new Date(`${isoDate}T00:00:00`),
  );
}

function getCountFormatter(locale: string): Intl.NumberFormat {
  let formatter = countFormatters.get(locale);
  if (!formatter) {
    formatter = new Intl.NumberFormat(locale, {
      maximumFractionDigits: 0,
      numberingSystem: 'latn',
    });
    countFormatters.set(locale, formatter);
  }
  return formatter;
}

export function formatCount(value: number, locale: string): string {
  return getCountFormatter(locale).format(value);
}
