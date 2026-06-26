const MAX_DELAY = 30_000;

export function getBackoffDelay(attempt: number) {
  const base = Math.min(1000 * 2 ** attempt, MAX_DELAY);
  const jitter = Math.random() * 1000;
  return base + jitter;
}
