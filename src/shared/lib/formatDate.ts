export function formatDate(
  iso: string,
  language?: string,
  hasHour: boolean = true,
): string {
  return new Intl.DateTimeFormat(language, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: hasHour ? '2-digit' : undefined,
    minute: hasHour ? '2-digit' : undefined,
  }).format(new Date(iso));
}
