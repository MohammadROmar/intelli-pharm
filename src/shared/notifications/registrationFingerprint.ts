const FINGERPRINT_VERSION = 'v1';
const FINGERPRINT_SEPARATOR = '\u0000';
const SHA_256_HEX_LENGTH = 64;
const SHA_256_HEX_PATTERN = /^[a-f0-9]{64}$/;

const LEGACY_FCM_TOKEN_STORAGE_KEY = 'fcm_token';

export const FCM_TOKEN_FINGERPRINT_STORAGE_KEY = `intelli-pharm:fcm-registration:${FINGERPRINT_VERSION}`;

let volatileFingerprint: string | null = null;
let volatileOnly = false;
let ignoreStoredFingerprint = false;

function getLocalStorage(): Storage | null {
  if (typeof window === 'undefined') return null;

  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

function readStorageValue(storage: Storage, key: string): string | null {
  try {
    return storage.getItem(key);
  } catch {
    return null;
  }
}

function removeStorageValue(storage: Storage, key: string): void {
  try {
    storage.removeItem(key);
  } catch {
    // The in-memory fallback still keeps this app instance consistent.
  }
}

function isValidFingerprint(value: string | null): value is string {
  return (
    value?.length === SHA_256_HEX_LENGTH && SHA_256_HEX_PATTERN.test(value)
  );
}

function normalizeEmail(email: string): string {
  const normalizedEmail = email.trim().toLowerCase();

  if (!normalizedEmail) {
    throw new Error('[FCM] Authenticated user email is unavailable');
  }

  return normalizedEmail;
}

function buildFingerprintInput(token: string, email: string): string {
  return [FINGERPRINT_VERSION, normalizeEmail(email), token].join(
    FINGERPRINT_SEPARATOR,
  );
}

async function sha256(value: string): Promise<string> {
  if (!globalThis.crypto?.subtle) {
    throw new Error('[FCM] Web Crypto is unavailable');
  }

  const data = new TextEncoder().encode(value);
  const digest = await globalThis.crypto.subtle.digest('SHA-256', data);

  return Array.from(new Uint8Array(digest), (byte) =>
    byte.toString(16).padStart(2, '0'),
  ).join('');
}

export async function createRegistrationFingerprint(
  token: string,
  email: string,
): Promise<string> {
  return sha256(buildFingerprintInput(token, email));
}

export function readRegistrationFingerprint(): string | null {
  const storage = getLocalStorage();

  if (!storage) return volatileFingerprint;

  if (ignoreStoredFingerprint) {
    removeStorageValue(storage, FCM_TOKEN_FINGERPRINT_STORAGE_KEY);
    removeStorageValue(storage, LEGACY_FCM_TOKEN_STORAGE_KEY);
    return volatileFingerprint;
  }

  if (volatileOnly) return volatileFingerprint;

  const storedFingerprint = readStorageValue(
    storage,
    FCM_TOKEN_FINGERPRINT_STORAGE_KEY,
  );

  if (isValidFingerprint(storedFingerprint)) {
    volatileFingerprint = storedFingerprint;
    volatileOnly = false;
    removeStorageValue(storage, LEGACY_FCM_TOKEN_STORAGE_KEY);
    return storedFingerprint;
  }

  if (storedFingerprint !== null) {
    removeStorageValue(storage, FCM_TOKEN_FINGERPRINT_STORAGE_KEY);
  }

  removeStorageValue(storage, LEGACY_FCM_TOKEN_STORAGE_KEY);
  volatileFingerprint = null;
  return null;
}

export function writeRegistrationFingerprint(fingerprint: string): void {
  if (!isValidFingerprint(fingerprint)) {
    throw new Error('[FCM] Invalid registration fingerprint');
  }

  volatileFingerprint = fingerprint;
  ignoreStoredFingerprint = false;

  const storage = getLocalStorage();
  if (!storage) return;

  try {
    storage.setItem(FCM_TOKEN_FINGERPRINT_STORAGE_KEY, fingerprint);
    storage.removeItem(LEGACY_FCM_TOKEN_STORAGE_KEY);
    volatileOnly = false;
  } catch {
    volatileOnly = true;
  }
}

export function clearRegistrationFingerprint(): void {
  volatileFingerprint = null;
  volatileOnly = false;
  ignoreStoredFingerprint = true;

  const storage = getLocalStorage();
  if (!storage) return;

  removeStorageValue(storage, FCM_TOKEN_FINGERPRINT_STORAGE_KEY);
  removeStorageValue(storage, LEGACY_FCM_TOKEN_STORAGE_KEY);
}
