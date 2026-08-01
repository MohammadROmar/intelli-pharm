const CHUNK_LOAD_ERROR_RE =
  /failed to fetch dynamically imported module|error loading dynamically imported module|importing a module script failed|failed to load module script|unable to preload css|loading css chunk|loading chunk|chunkloaderror|is not a valid javascript mime type/i;

const RECOVERY_STORAGE_KEY = 'intellipharm:chunk-recovery:v2';
const RECOVERY_SCHEMA_VERSION = 2;
const RECOVERY_CHECK_TIMEOUT_MS = 8_000;
const RECOVERY_CHECK_COOLDOWN_MS = 15_000;
const BUILD_ASSET_SELECTOR = [
  'script[type="module"][src]',
  'script[type="importmap"]',
  'link[rel="modulepreload"][href]',
  'link[rel="stylesheet"][href]',
  'link[rel="preload"][as="script"][href]',
  'link[rel="preload"][as="style"][href]',
].join(',');

type StoredRecoveryAttempt = {
  schemaVersion: typeof RECOVERY_SCHEMA_VERSION;
  targetBuild: string;
};

export type ChunkRecoveryResult =
  | 'reload-started'
  | 'already-reloaded'
  | 'build-is-current'
  | 'check-unavailable'
  | 'offline'
  | 'not-a-chunk-error'
  | 'skipped';

let recoveryInFlight: Promise<ChunkRecoveryResult> | null = null;
let lastRecoveryCheckAt = 0;

const currentBuildSignature =
  typeof document === 'undefined' ? null : getBuildSignature(document);

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === 'string') return error;

  if (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof error.message === 'string'
  ) {
    return error.message;
  }

  return '';
}

export function isChunkLoadError(error: unknown): boolean {
  return CHUNK_LOAD_ERROR_RE.test(getErrorMessage(error));
}

function getBuildSignature(documentNode: Document): string | null {
  const assets = Array.from(
    documentNode.querySelectorAll<HTMLElement>(BUILD_ASSET_SELECTOR),
  ).map((element) => {
    const tagName = element.tagName.toLowerCase();

    if (tagName === 'script' && element.getAttribute('type') === 'importmap') {
      return `importmap:${element.textContent?.trim() ?? ''}`;
    }

    const url =
      element.getAttribute('src') ?? element.getAttribute('href') ?? '';
    const relation = element.getAttribute('rel') ?? '';
    const resourceType =
      element.getAttribute('type') ?? element.getAttribute('as') ?? '';

    return `${tagName}:${relation}:${resourceType}:${url}`;
  });

  return assets.length > 0 ? assets.join('|') : null;
}

function readRecoveryAttempt(): StoredRecoveryAttempt | null {
  try {
    const value = sessionStorage.getItem(RECOVERY_STORAGE_KEY);
    if (!value) return null;

    const parsed: unknown = JSON.parse(value);
    if (
      typeof parsed !== 'object' ||
      parsed === null ||
      !('schemaVersion' in parsed) ||
      parsed.schemaVersion !== RECOVERY_SCHEMA_VERSION ||
      !('targetBuild' in parsed) ||
      typeof parsed.targetBuild !== 'string'
    ) {
      return null;
    }

    return parsed as StoredRecoveryAttempt;
  } catch {
    return null;
  }
}

function markRecoveryAttempt(targetBuild: string): boolean {
  const previousAttempt = readRecoveryAttempt();
  if (previousAttempt?.targetBuild === targetBuild) return false;

  const attempt: StoredRecoveryAttempt = {
    schemaVersion: RECOVERY_SCHEMA_VERSION,
    targetBuild,
  };

  try {
    const value = JSON.stringify(attempt);
    sessionStorage.setItem(RECOVERY_STORAGE_KEY, value);

    return sessionStorage.getItem(RECOVERY_STORAGE_KEY) === value;
  } catch {
    return false;
  }
}

async function fetchLatestBuildSignature(): Promise<string | null> {
  if (typeof window === 'undefined') return null;

  const controller = new AbortController();
  const timeoutId = window.setTimeout(
    () => controller.abort(),
    RECOVERY_CHECK_TIMEOUT_MS,
  );

  try {
    const url = new URL(import.meta.env.BASE_URL, window.location.origin);
    url.searchParams.set('__build_check', Date.now().toString(36));

    const response = await fetch(url, {
      cache: 'no-store',
      credentials: 'omit',
      headers: { Accept: 'text/html' },
      redirect: 'follow',
      signal: controller.signal,
    });

    if (!response.ok) return null;

    const contentType = response.headers.get('content-type');
    if (contentType && !contentType.includes('text/html')) return null;

    const html = await response.text();
    const latestDocument = new DOMParser().parseFromString(html, 'text/html');

    return getBuildSignature(latestDocument);
  } catch {
    return null;
  } finally {
    window.clearTimeout(timeoutId);
  }
}

async function checkForStaleDeployment(): Promise<ChunkRecoveryResult> {
  if (!import.meta.env.PROD || currentBuildSignature === null) return 'skipped';
  if (typeof navigator !== 'undefined' && navigator.onLine === false) {
    return 'offline';
  }

  const latestBuildSignature = await fetchLatestBuildSignature();
  if (latestBuildSignature === null) return 'check-unavailable';
  if (latestBuildSignature === currentBuildSignature) return 'build-is-current';

  if (!markRecoveryAttempt(latestBuildSignature)) return 'already-reloaded';

  window.location.reload();
  return 'reload-started';
}

function scheduleRecoveryCheck(): Promise<ChunkRecoveryResult> {
  if (recoveryInFlight) return recoveryInFlight;

  const now = Date.now();
  if (now - lastRecoveryCheckAt < RECOVERY_CHECK_COOLDOWN_MS) {
    return Promise.resolve('skipped');
  }

  lastRecoveryCheckAt = now;
  recoveryInFlight = checkForStaleDeployment().finally(() => {
    recoveryInFlight = null;
  });

  return recoveryInFlight;
}

export function initializeDeploymentProtection(): void {
  const deploymentId = import.meta.env.VITE_VERCEL_DEPLOYMENT_ID?.trim();
  const skewProtectionEnabled =
    import.meta.env.VITE_VERCEL_SKEW_PROTECTION_ENABLED === '1';

  if (
    !import.meta.env.PROD ||
    !skewProtectionEnabled ||
    !deploymentId ||
    typeof document === 'undefined'
  ) {
    return;
  }

  try {
    document.cookie = `__vdpl=${encodeURIComponent(deploymentId)}; Path=/; Secure; SameSite=Lax`;
  } catch {
    // The verified recovery flow remains available when cookies are disabled.
  }
}

export function recoverFromVitePreloadError(): Promise<ChunkRecoveryResult> {
  return scheduleRecoveryCheck();
}

export function recoverFromChunkLoadError(
  error: unknown,
): Promise<ChunkRecoveryResult> {
  if (!isChunkLoadError(error)) {
    return Promise.resolve('not-a-chunk-error');
  }

  return scheduleRecoveryCheck();
}
