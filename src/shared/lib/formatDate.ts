export function formatDate(
  iso: string | Date,
  language: string = 'en-US',
  hasHour: boolean = true,
): string {
  return new Intl.DateTimeFormat(language, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    ...(hasHour ? { hour: 'numeric', minute: '2-digit' } : {}),
  }).format(new Date(iso));
}
