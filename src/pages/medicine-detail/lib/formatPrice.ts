export function formatPrice(price: string, locale?: string): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'SYP',
  }).format(Number(price));
}
