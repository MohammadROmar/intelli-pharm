const BASE_DELAY_MS = 2_000;
const MAX_DELAY_MS = 60_000;
const JITTER_WINDOW_MS = 500;

function normalizeAttempt(attempt: number): number {
  if (!Number.isFinite(attempt)) return 0;
  return Math.max(0, Math.floor(attempt));
}

export function getBackoffDelay(attempt: number): number {
  const exponentialDelay = Math.min(
    BASE_DELAY_MS * 2 ** normalizeAttempt(attempt),
    MAX_DELAY_MS,
  );
  const jitter = Math.floor(Math.random() * JITTER_WINDOW_MS);

  return Math.min(exponentialDelay + jitter, MAX_DELAY_MS);
}
