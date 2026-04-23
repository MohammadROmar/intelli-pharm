export function formatDate(
  iso: string | Date,
  language: string = 'en-US',
  hasHour: boolean = true,
): string {
  return new Intl.DateTimeFormat(language, {
    dateStyle: 'medium',
    timeStyle: hasHour ? 'short' : undefined,
  }).format(new Date(iso));
}
