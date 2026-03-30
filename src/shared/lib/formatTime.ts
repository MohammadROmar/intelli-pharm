export function formatTime(time: string, locale?: string): string {
  const [h, m] = time.split(':').map(Number);
  const date = new Date();
  date.setHours(h, m);
  return new Intl.DateTimeFormat(locale, {
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}
