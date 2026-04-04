export function formatTime(time: string, locale?: string) {
  const [h, m] = time.split(':').map(Number);
  const date = new Date();
  date.setHours(h, m);
  return new Intl.DateTimeFormat(locale, {
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

export function formatTime12h(dateString: string, locale = 'en') {
  const date = new Date(dateString);

  return new Intl.DateTimeFormat(locale, {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(date);
}
