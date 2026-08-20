export function formatServiceTime(
  totalSeconds: number,
  language: string,
): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const numberFormatter = new Intl.NumberFormat(language, {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });

  const parts = hours > 0 ? [hours, minutes, seconds] : [minutes, seconds];

  return parts.map((part) => numberFormatter.format(part)).join(':');
}
