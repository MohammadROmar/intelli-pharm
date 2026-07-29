const DEFAULT_NOTIFICATION_PATH = '/dashboard/notifications';
const ALLOWED_PATH_PREFIX = '/dashboard';

export function getSafeNotificationPath(link?: string): string {
  if (!link || typeof window === 'undefined') {
    return DEFAULT_NOTIFICATION_PATH;
  }

  try {
    const url = new URL(link, window.location.origin);

    if (
      url.origin !== window.location.origin ||
      (url.pathname !== ALLOWED_PATH_PREFIX &&
        !url.pathname.startsWith(`${ALLOWED_PATH_PREFIX}/`))
    ) {
      return DEFAULT_NOTIFICATION_PATH;
    }

    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return DEFAULT_NOTIFICATION_PATH;
  }
}
