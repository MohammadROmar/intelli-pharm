const LEGACY_AUTH_DATABASE_NAME = 'intelli-pharm-sw';

let cleanupCompleted = false;
let cleanupPromise: Promise<void> | null = null;

export function cleanupLegacyNotificationStorage(): Promise<void> {
  if (
    cleanupCompleted ||
    typeof indexedDB === 'undefined' ||
    typeof window === 'undefined'
  ) {
    return Promise.resolve();
  }

  if (cleanupPromise) return cleanupPromise;

  const requestPromise = new Promise<void>((resolve, reject) => {
    let request: IDBOpenDBRequest;

    try {
      request = indexedDB.deleteDatabase(LEGACY_AUTH_DATABASE_NAME);
    } catch (error) {
      reject(error);
      return;
    }

    request.addEventListener(
      'success',
      () => {
        cleanupCompleted = true;
        resolve();
      },
      { once: true },
    );
    request.addEventListener(
      'error',
      () => reject(request.error ?? new Error('IndexedDB cleanup failed')),
      { once: true },
    );

    request.addEventListener('blocked', () => resolve(), { once: true });
  }).finally(() => {
    cleanupPromise = null;
  });

  cleanupPromise = requestPromise;
  return requestPromise;
}
