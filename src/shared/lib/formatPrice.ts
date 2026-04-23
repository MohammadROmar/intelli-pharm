export function formatPrice(price: string | number, locale?: string) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'SYP',
  }).format(Number(price));
}
